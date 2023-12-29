# Braintly Challenge
This is the full stack developer challenge for [Braintly](https://braintly.com/)
The tasks of the challenge can be found [here](https://braintly.notion.site/Challenge-FullStack-Dev-Sr-TS-bad9302c242d4465a479c8268333c3a7)

## Considerations
### Backend
1. [NestJS](https://nestjs.com/): It helps to build scalable apps. Not the best framework to use when trying to apply Clean Architecture but I decided to use it anyway because it helps a lot during the developing time.
2. MySQL
3. [TypeORM](https://typeorm.io/): Besides the performance issue that this ORM can have it's really easy to use when developing small apps
4. Supertest & Jest to run E2E tests

### Frontend
1. React
2. [Material UI](https://mui.com/)

### Infrastructure
1. Docker & docker compose to build the project: Given the time I had to develop the challenge I decided not to deploy it in a cloud provider like AWS or Heroku

## How To
### Run it
`cd braintly`

`docker-compose up  --build`

### Run tests
Ensure that the ENVIRONMENT is set and run it outside docker 

`npm run test:e2e`

## TODO & Explanations
1. Given the time I wasn't able to add the order dates from the column with a button and made the api call to the backend but the `GET /tasks` endpoint will always return the tasks ordered.
2. Tests where made only for one endpoint just to show how should be done, unfortunately it will take quiet some time to increase the coverage of the app and I decided to include more tasks to the challenge.
3. I used at least two design patterns:
   1. Dependency injection
   2. Repository pattern
4. In the frontend some types and proptypes are missing
5. A service with events could be done in order to find which tasks are overdue
