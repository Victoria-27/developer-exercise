# DeveloperExercise

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.4.

## Introduction

The User Catalog application is a web-based tool designed to help users manage and search through a directory of users. It provides functionalities to search for users and edit their roles, and also edit the user details and profile picture.

## Features

- **Search Users:** Allows users to search for specific users within the directory.

- **Edit User Roles:** Enables users to edit the roles of the users found in the directory.

- **Update User Details:** Allows users to update details and upload profile pictures of users.

## Additional Information

- Added readonly to id and version feilds
- Toggle functionality to switch user role
- Integrated profile picture implementation to user profile

## Supabase Setup

- **Sign Up for Supabase**: [Sign up](https://supabase.io/) for a Supabase account if you haven't already.
- **Create a Project**: Create a new project in your Supabase dashboard.
- **Get Credentials**: Obtain the API URL, public key, and private key from your Supabase project settings.
- **Environment Variables**: Set up environment variables in your application to securely store Supabase credentials.

## List of Created Tables

Below is a list of table and storage created in the Supabase project:

- `profile`: this table stores the user data.
- `savedpictures`: this bucket is used to save the uploaded profile picture of each user.

## System Requirements

- Web Browser (Chrome, Firefox, Safari, etc.)

- Node.js (v12.x or higher)

- Angular CLI

## Running the Application

To run the application locally:

- Clone the repository: `git clone <repository-url>`
- Install dependencies: `npm install`
- Set up environment variables with Supabase credentials.

**Run Development Server:**

- Start the development server with the command `ng serve`. The application will be accessible at `http://localhost:4200`.

## Sample Data

You can find the sample data used for populating Supabase in the following JSON file:
[Sample Data JSON](https://raw.githubusercontent.com/Victoria-27/developer-exercise/master/dummy.json)

## Troubleshooting and FAQs

Include common troubleshooting tips and FAQs related to Supabase setup and usage.

## References

- [Supabase Documentation](https://supabase.io/docs)
- [Helpful Resources](https://supabase.com/docs/guides/api/rest/generating-types)
- [UI Design](https://app.uizard.io/p/e3d0540f/preview)


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
