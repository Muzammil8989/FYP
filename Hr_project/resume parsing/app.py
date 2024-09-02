from flask import Flask, request, jsonify
from flask_cors import CORS
from pdfminer.high_level import extract_text
import io
import re
import spacy
from spacy.matcher import Matcher
from db import skills_collection  # Import MongoDB collection

app = Flask(__name__)
CORS(app)  # This line enables CORS for all routes and origins

# Load spaCy model and initialize Matcher
nlp = spacy.load('en_core_web_sm')
matcher = Matcher(nlp.vocab)

def extract_text_from_pdf(file):
    file.seek(0)  # Ensure you're reading from the beginning of the file
    return extract_text(file)



def extract_contact_number_from_resume(text):
    # Updated pattern to match various phone number formats
    pattern = r"\b(?:\+?\d{1,3}[-.\s]?)?(?:\(?\d{3}\)?[-.\s]?|\d{3}[-.\s]?)?\d{3}[-.\s]?\d{4}\b"
    match = re.search(pattern, text)
    return match.group() if match else None


def extract_email_from_resume(text):
    pattern = r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b"
    match = re.search(pattern, text)
    return match.group() if match else None

def extract_skills_from_resume(text, skills_list):
    skills = []
    for skill in skills_list:
        pattern = r"\b{}\b".format(re.escape(skill))
        if re.search(pattern, text, re.IGNORECASE):
            skills.append(skill)
    return skills

def extract_education_from_resume(text):
    pattern = r"(?i)\b(?:Bachelor|B\.?Sc|B\.?Eng|B\.?A|B\.?Tech|Master|M\.?Sc|M\.?Eng|M\.?A|M\.?Tech|Ph\.?D|Doctorate|High School|Diploma|Degree|Certification|Graduate|Post[-\s]?Graduate|Under[-\s]?Graduate)\b.*?(?=\n|$|[.;])"
    matches = re.findall(pattern, text)
    return [match.strip() for match in matches]

def extract_colleges_from_resume(text):
    colleges = set()  # Use a set to avoid duplicates
    pattern = r"([A-Z][^\s,.]+[.]?\s)*(College|University|Institute|Law School|School of|Academy)[^,\d]*(?=,|\d)"
    matches = re.findall(pattern, text, re.IGNORECASE)
    
    for match in matches:
        college_name = " ".join(part.strip() for part in match if part)
        if college_name:
            colleges.add(college_name)  # Add to set, automatically handles duplicates
    
    return list(colleges)  # Convert set back to list for the response




def extract_name(resume_text):
    patterns = [
        [{'POS': 'PROPN'}, {'POS': 'PROPN'}],  # First name and Last name
        [{'POS': 'PROPN'}, {'POS': 'PROPN'}, {'POS': 'PROPN'}],  # First name, Middle name, and Last name
        [{'POS': 'PROPN'}, {'POS': 'PROPN'}, {'POS': 'PROPN'}, {'POS': 'PROPN'}]  # First name, Middle name, Middle name, and Last name
    ]
    for pattern in patterns:
        matcher.add('NAME', patterns=[pattern])
    doc = nlp(resume_text)
    matches = matcher(doc)
    for match_id, start, end in matches:
        span = doc[start:end]
        return span.text
    return None

@app.route('/extract', methods=['POST'])
def extract_data():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['file']
    text = extract_text_from_pdf(io.BytesIO(file.read()))
    name = extract_name(text)
    contact_number = extract_contact_number_from_resume(text)
    email = extract_email_from_resume(text)

    mongo_document = skills_collection.find_one()
    skills_list = mongo_document.get('skills', []) if mongo_document else []
    skills = extract_skills_from_resume(text, skills_list)
    
    education = extract_education_from_resume(text)
    colleges = extract_colleges_from_resume(text)

    return jsonify({
        'name': name,
        'contact_number': contact_number,
        'email': email,
        'skills': skills,
        'education': education,
        'colleges': colleges
    })

if __name__ == '__main__':
    app.run(debug=True)
