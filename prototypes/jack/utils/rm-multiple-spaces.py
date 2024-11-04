import json
import re

# Load JSON data from file
with open('recipes.json', 'r') as file:
    json_data = json.load(file)

# Function to clean up multiple spaces in the name field
def clean_name_field(data):
    for item in data:
        if 'name' in item:
            item['name'] = re.sub(r'\s+', ' ', item['name']).strip()
    return data

# Clean the data
cleaned_data = clean_name_field(json_data)

# Save cleaned data back to the file
with open('recipes.json', 'w') as file:
    json.dump(cleaned_data, file, indent=4)

print("The name fields have been cleaned and saved back to recipes.json.")
