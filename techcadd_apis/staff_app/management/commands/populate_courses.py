# staff_app/management/commands/populate_courses.py
#  python manage.py populate_courses
from django.core.management.base import BaseCommand
from staff_app.models import CourseType, Course

class Command(BaseCommand):
    help = 'Populate course types and courses data'

    def handle(self, *args, **kwargs):
        # Course Types
        course_types_data = [
            {'id': 1, 'name': 'Civil'},
            {'id': 7, 'name': 'Mechanical'},
            {'id': 10, 'name': 'Computer Application'},
            {'id': 18, 'name': 'IT'},
            {'id': 14, 'name': 'Graphic Designing'},
            {'id': 11, 'name': 'Digital Marketing'},
        ]
        
        # Courses data by type
        courses_data = {
            'Civil': [
                {'name': 'Basic Autocad', 'duration': '45_days', 'hours': 40, 'fee': 9500},
                {'name': 'Advance Autocad', 'duration': '2_months', 'hours': 80, 'fee': 12500},
                {'name':'3DX MAX', 'duration': '2_months', 'hours': 80, 'fee': 16500},
                {'name':'3DX MAX + V RAY + Photoshop ', 'duration': '4_months', 'hours': 160, 'fee': 22500},
                {'name':'Revit', 'duration': '2_months', 'hours': 80, 'fee': 16500},
                {'name':'Revit + ENSACPE', 'duration': '4_months', 'hours': 160, 'fee': 20500},
                {'name':'Sketchup + V RAY', 'duration': '2_months', 'hours': 80, 'fee': 14500},
                {'name':'Staad Pro', 'duration': '1_month', 'hours': 60, 'fee': 15500},
                {'name':'ETAB', 'duration': '1_month', 'hours': 60, 'fee': 15500},
                {'name':'Prima Veera', 'duration': '1_month', 'hours': 60, 'fee': 12500},
                {'name':'MSP', 'duration': '1_month', 'hours': 60, 'fee': 12500},
                {'name': 'Certificate Course in Civil CAD', 'duration': '3_months', 'hours': 120, 'fee': 15000},
                {'name': 'Diploma in Civil CAD', 'duration': '6_months', 'hours': 240, 'fee': 25000},
                {'name': 'Professional Diploma in Civil CAD', 'duration': '9_months', 'hours': 360, 'fee': 35000},
                {'name': 'Master Diploma in Civil CAD', 'duration': '1_year', 'hours': 480, 'fee': 45000},
                
            ],
            'IT': [
                {'name': 'Web Developemnt using PHP(html,css,js,php,mysql)', 'duration': '4_months', 'hours': 160, 'fee': 25500},
                {'name': 'Web Development using Python(html,css,js,python,django,php,mysql)', 'duration': '4_months', 'hours': 160, 'fee': 28500},
                {'name': 'PHP(Frontend and Backend)', 'duration': '6_months', 'hours': 300, 'fee': 36500},
                {'name': 'Python(Frontend and Backend)', 'duration': '6_months', 'hours': 300, 'fee': 42500},
                {'name': 'Wordpress', 'duration': '2_months', 'hours': 80, 'fee': 15500},
                {'name': 'Shopify', 'duration': '2_months', 'hours': 80, 'fee': 15500},
                {'name': 'Data Analysis', 'duration': '4_months', 'hours': 160, 'fee': 36500},
                {'name': 'Data Science', 'duration': '6_months', 'hours': 300, 'fee': 45500},
                {'name': 'Python + Machine Learning', 'duration': '6_months', 'hours': 300, 'fee': 42500},
                {'name': 'Certificate in Programming Language', 'duration': '2_months', 'hours': 80, 'fee': 12000},
                {'name': 'Certificate in Web Designing', 'duration': '3_months', 'hours': 120, 'fee': 15000},
                {'name': 'Certificate in Web Development', 'duration': '3_months', 'hours': 120, 'fee': 16000},
                {'name': 'Diploma in Web Designing', 'duration': '6_months', 'hours': 240, 'fee': 25000},
                {'name': 'Diploma in Web Development', 'duration': '6_months', 'hours': 240, 'fee': 28000},
                {'name': 'Full Stack Web Development', 'duration': '6_months', 'hours': 300, 'fee': 35000},
                {'name': 'MERN Stack Development', 'duration': '6_months', 'hours': 300, 'fee': 38000},
                {'name': 'Certificate Course in Cyber Security', 'duration': '4_months', 'hours': 160, 'fee': 22000},
            ],
            'Computer Application': [
                {'name': 'Basics of Computer', 'duration': '2_months', 'hours': 80, 'fee': 6500},
                {'name': 'MS Office (Word, Excel, PowerPoint)', 'duration': '1_month', 'hours': 40, 'fee': 5500},
                {'name': 'Advance Excel', 'duration': '1_month', 'hours': 60, 'fee': 4500},
                {'name': 'Google Work Space', 'duration': '1_month', 'hours': 60, 'fee': 2500},
                {'name': 'Tally ERP 9', 'duration': '2_months', 'hours': 80, 'fee': 11500},
                {'name': 'Tally Prime', 'duration': '2_months', 'hours': 80, 'fee': 11500},
                {'name': 'Quickbooks', 'duration': '45_days', 'hours': 40, 'fee': 10500},
                {'name': 'CAT Pro', 'duration': '45_days', 'hours': 40, 'fee': 10500},
                {'name': 'Punjabi Typing', 'duration': '1_month', 'hours': 60, 'fee': 3500},
                {'name': 'English Typing', 'duration': '1_month', 'hours': 60, 'fee': 3500},
                {'name': 'Diploma in Computer Applications', 'duration': '1_year', 'hours': 480, 'fee': 36500},
                {'name': 'Advanced Diploma in Computer Applications', 'duration': '1_year', 'hours': 480, 'fee': 40500},
                {'name': 'Diploma in Finace and Accounting', 'duration': '6_months', 'hours': 360, 'fee': 18500},
                {'name': 'Advanced Diploma in Finace and Accounting', 'duration': '1_year', 'hours': 480, 'fee': 36500},
                {'name': 'Certificate in Computer Applications', 'duration': '3_months', 'hours': 120, 'fee': 10000},
                {'name': 'Advanced Computer Applications', 'duration': '6_months', 'hours': 240, 'fee': 18000},
            ],
            'Graphic Designing': [
                {'name': 'Photoshop', 'duration': '45_days', 'hours': 40, 'fee': 10500},
                {'name': 'Illustrator', 'duration': '45_days', 'hours': 40, 'fee': 12000},
                {'name': 'Corel Draw', 'duration': '45_days', 'hours': 40, 'fee': 9500},
                {'name': 'Photo & Video Graphy', 'duration': '2_months', 'hours': 80, 'fee': 14500},
                {'name': 'Motion Graphics', 'duration': '2_months', 'hours': 80, 'fee': 12500},
                {'name': 'Adobe After Effects', 'duration': '3_months', 'hours': 120, 'fee': 18000},
                {'name': 'Sketching & Painting', 'duration': '3_months', 'hours': 120, 'fee': 15500},
                {'name': 'Adobe Premiere Pro', 'duration': '3_months', 'hours': 120, 'fee': 15000},
                {'name': 'Video Editing', 'duration': '3_months', 'hours': 120, 'fee': 24500},
                {'name': 'VFX', 'duration': '3_months', 'hours': 120, 'fee': 32500},
                {'name': '3D Animation', 'duration': '3_months', 'hours': 120, 'fee': 25000},
                {'name': 'Diploma in Video Editing', 'duration': '6_months', 'hours': 300, 'fee': 38500},
                {'name': 'Certificate Course in Graphic Designing', 'duration': '3_months', 'hours': 120, 'fee': 15000},
                {'name': 'Diploma in Graphic Designing', 'duration': '6_months', 'hours': 300, 'fee': 38500},
                {'name': 'Professional Graphic Design Course', 'duration': '9_months', 'hours': 360, 'fee': 35000},
            ],
            'Digital Marketing': [
                {'name': 'Certificate in Digital Marketing', 'duration': '3_months', 'hours': 120, 'fee': 18000},
                {'name': 'Advanced Digital Marketing', 'duration': '6_months', 'hours': 240, 'fee': 30000},
            ],
            'Mechanical': [
                {'name': 'Autocad', 'duration': '45_days', 'hours': 40, 'fee': 9500},
                {'name': 'Solidworks', 'duration': '2_months', 'hours': 80, 'fee': 18500},
                {'name':'Catia', 'duration': '3_months', 'hours': 120, 'fee': 20500},
                {'name':'NX CAD', 'duration': '2_months', 'hours': 80, 'fee': 20500},
                {'name':'NX CAD + NX Cam', 'duration': '3_months', 'hours': 120, 'fee': 24500},
                {'name':'CNC Programming', 'duration': '1_month', 'hours': 60, 'fee': 12500},
                {'name':'Work NC', 'duration': '1_month', 'hours': 60, 'fee': 14500},
                {'name':'Solid CAM', 'duration': '1_month', 'hours': 60, 'fee': 14500},
                {'name':'Diploma in Mechanical CAD', 'duration': '3_months', 'hours': 120, 'fee': 26500},
                {'name': 'Certificate Course in Mechanical CAD', 'duration': '3_months', 'hours': 120, 'fee': 16000},
                {'name': 'Master Diploma in Mechanical CAD', 'duration': '6_months', 'hours': 240, 'fee': 28000},
                {'name': 'Professional Mechanical Design', 'duration': '9_months', 'hours': 360, 'fee': 40000},
            ]
        }
        
        # Create course types
        for type_data in course_types_data:
            course_type, created = CourseType.objects.get_or_create(
                id=type_data['id'],
                defaults={'name': type_data['name']}
            )
            if created:
                self.stdout.write(f"Created course type: {course_type.name}")
        
        # Create courses
        for type_name, courses in courses_data.items():
            course_type = CourseType.objects.get(name=type_name)
            for course_data in courses:
                course, created = Course.objects.get_or_create(
                    course_type=course_type,
                    name=course_data['name'],
                    defaults={
                        'duration_months': course_data['duration'],
                        'duration_hours': course_data['hours'],
                        'course_fee': course_data['fee'],
                        'software_covered': f"Software for {course_data['name']}"
                    }
                )
                if created:
                    self.stdout.write(f"Created course: {course.name}")
        
        self.stdout.write(self.style.SUCCESS('Successfully populated course data'))