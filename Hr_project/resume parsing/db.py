from pymongo import MongoClient

# MongoDB connection URL
MONGO_URL = ''

# Create a MongoClient instance
client = MongoClient(MONGO_URL)

# Select the database and collection
db = client['Skill']
skills_collection = db['Skill_set']

from db import skills_collection






