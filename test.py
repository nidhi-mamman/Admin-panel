# Student Name
# Date of Birth
# Qualification
# Work/College
# Mobile
# Email
# Address
# Enquiry Date
# Centre -> there are multiple centres
# Enquiry Taken By -> it will be staff name or id 
# Batch Time
# Course Fee Offer
# Course Intrested
# Trade          -> multiple course list 
# Enquiry Source  
# Assign Enquiry -> Staff Name or ID

# Enquiry Status
# Remark
# Next Follow up Date
# jalandhar1
# jalandhar2
# maqsudan 
# ludhiana
# hoshiarpur
# mohali
# phagwara

# models -> serializers -> views -> urls 

import requests
import json

url = "http://127.0.0.1:8000/api/staff/registrations/create/"

payload = json.dumps({
  "branch": "mohali",
  "joining_date": "2025-10-29",
  "student_name": "testingmodule",
  "father_name": "Ramesh Kumar",
  "date_of_birth": "2005-06-15",
  "student_type": "school",
  "class_name": "11th",
  "school_name": "Modern Public School",
  "qualification": "10th Pass",
  "work_college": "Modern Public School",
  "class_mode": "both",
  "contact_address": "789 Sector 15, Mohali",
  "phone_no": "9776653443",
  "email": "testingmodwerwerwerwerule@example.com",
  "course_type": 14,
  "course": 8,
  "software_covered": "Photoshop, Illustrator",
  "duration_months": "3_months",
  "duration_hours": 120,
  "total_course_fee": 15000,
  "paid_fee": 5000
})
headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzY1MzU5OTU5LCJpYXQiOjE3NjUzNTYzNTksImp0aSI6IjY2ZGY1ZWM0ZGFkNTRiNzE4MTM5ZTQ4Y2JiZTU2MTM1IiwidXNlcl9pZCI6IjIifQ.A9EvlgeHcgKMW29oYiRm-l_V1rrI4j-DQ936fXFIlhY'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)