# Resume Analyzer :page_facing_up:

A resume analyzer to match resumes to job descriptions.

## Tech Stack :computer:

Built using Next.js for frontend, Django REST Framework for backend.

## How to run :wrench:

To run the frontend app:
```
cd frontend
pnpm install
pnpm dev
```

To run the backend app:
```
cd backend
pip install -r requirements.txt 
python manage.py migrate
python manage.py runserver
```

## API Reference :notebook_with_decorative_cover:

#### Add Resume
```
POST /resume/
```
| Body Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `resume` | `string` |  Base64 encoded string of the resume pdf |

| Response Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` |  Name on the resume |
| `email` | `string` |  Email on the resume |
| `mobile` | `string` |  Phone number on the resume |
| `resume` | `string` |  Base64 encoded string of the resume pdf |
| `skills` | `string` |  List of skills separated by ',' |
| `uuid` | `string` |  uuid of the resume |
| `experiences` | `string` |  Experiences on the resume |

#### Get/change/delete resume
```
GET/PUT/DELETE /resume/<id>/
```
`id` is the uuid of a resume.

For PUT request: 
| Body Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` |  Name on the resume |
| `email` | `string` |  Email on the resume |
| `mobile` | `string` |  Phone number on the resume |
| `skills` | `string` |  List of skills separated by ',' |
| `experiences` | `string` |  Experiences on the resume |

For PUT/GET requests:
| Response Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` |  Name on the resume |
| `email` | `string` |  Email on the resume |
| `mobile` | `string` |  Phone number on the resume |
| `resume` | `string` |  Base64 encoded string of the resume pdf |
| `skills` | `string` |  List of skills separated by ',' |
| `uuid` | `string` |  uuid of the resume |
| `experiences` | `string` |  Experiences on the resume |

#### Compare resume with job description
```
POST /job_description/<id>/
```
`id` is the uuid of a resume.

| Body Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `job_description` | `string` |  Job description to compare with |

| Response Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `rating` | `string` |  Match rating out of 100 |
| `skills` | `string[]` |  List of skills extracted from the job description |
