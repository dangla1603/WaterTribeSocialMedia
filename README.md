# Social Network v2 (Second Iteration)

## Project Description

In this web application every employee can connect to other employees, whether it be an associate, a trainer, or contracted employees. Each person has their own account, that comes with a unique username, employee information. Within this network employees can access locations and information to help them with many different possibilities. Also it is being created to ease the transition as a employee, whether it be as a trainer/associate, contracted employee/contractor, or staff member.

## Technologies Used

* Java
* Angular
* HTML/CSS
* AWS RDS
* PostgreSQL
* SQL
* Hibernate
* JavaScript
* Log4J
* JUnit
* EC2
* Jenkins
* S3

## Features

* User can log in and it will show the main-page which have all other people post. There is navbar that user can go to profile, friend-list, chat room or search for other people
* On profile, user will able to see their own profile and posts. User can also update their profile.
* On friend-list, user will able to see all users exsiting.
* On chat-room, user will be able to chat with other users in the system.


To-do list:
* User can add other user and will show in the friend-list instead of showing all user.
* User can create a private room and invite other users to join.
* User can add post with image/youtube url.

## Getting Started
* First we need to git clone the project
> git clone https://github.com/dangla1603/WaterTribeSocialMedia.git
* Installing IntelliJ https://www.jetbrains.com/idea/download/#section=windows
* Installing tombcat server inside IntelliJ
* Installing VSC https://code.visualstudio.com/


## Usage

* Opening the back-end folder in IntelliJ, go to setting and plugin section, install the tomcat, then create configuration and adjust the setting. When done, run the tomcat.
![tomcat](https://user-images.githubusercontent.com/43182305/115811185-df41bc00-a3b4-11eb-8a66-3e5a9d48935a.PNG)

* Open the frot-end folder in VSC, make sure that you have node_modules folder inside the project.
* If not, open terminal and type "-npm install" to have that set up
* type " ng serve -o " to run the project

* Using http://localhost:4200/ to access the project when you have back-end and front-end running.
* Landing page will look like this
![login](https://user-images.githubusercontent.com/43182305/115811098-bb7e7600-a3b4-11eb-8769-a386cb06e619.PNG)

* You can register new account if you don't have one.
![register](https://user-images.githubusercontent.com/43182305/115811128-c46f4780-a3b4-11eb-8179-8696b167ffd9.PNG)

* When you log in, you will redirect to main-page where you can see all other posts or access to other options.
![main-page](https://user-images.githubusercontent.com/43182305/115811106-bcafa300-a3b4-11eb-8466-ec7bdc50b260.PNG)

* You can go to profile and view/update your profile.
![profile](https://user-images.githubusercontent.com/43182305/115811114-bfaa9380-a3b4-11eb-8e03-c181ba2cc941.PNG)

* You can go to friend-list and view other users.
![friend-list](https://user-images.githubusercontent.com/43182305/115811118-c0dbc080-a3b4-11eb-9626-1d89acc399f4.PNG)

* You can search for other username and view their profile.
![user-profile](https://user-images.githubusercontent.com/43182305/115811124-c33e1a80-a3b4-11eb-82ab-1f9aef15d5ae.PNG)

* You can chat with other using chat-room
![chat-room](https://user-images.githubusercontent.com/43182305/115811121-c20ced80-a3b4-11eb-861b-8baafdf6256f.PNG)

* You can log out and it will bring you back to landing page. You can also use forget-password to recover your password, you will need valid email to able to recieve the email that help you enter new password.
![forget](https://user-images.githubusercontent.com/43182305/115811129-c5a07480-a3b4-11eb-9d7f-8ae2c98abe82.PNG)

## Contributors
  * Team Water Tribe
    * Christian Kent      - https://github.com/kentx178
    * Chris Bonner        - https://github.com/Skorne
    * Nicholas Haselden   - https://github.com/nwhaselde
    * Dang La             - https://github.com/dangla1603

## License

This project uses the following license: [<license_name>](<link>).
