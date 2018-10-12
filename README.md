# Train-Scheduler - Juan Carlos Salas
Assignment 7

This Train Scheduler uses Firebase to hold data for train information that is inputed through the webpage. The user inputs the name of the train, its destination, the first train of the day as well as its frequency.

Using moment.js, the page takes the time of the firs train of the day and uses its arrival frequency to calculate the next time train in comparison to when the information was been inputed (i.e. if a train starts at 7:00 am and passes every 10 minutes, if the information is inputed at 2:25 pm, it will display that the train will arrive in 5 minutes at 2:30pm).

The user will be able to input as many train data as possible adn that information will retain regardless where the webpage is accessed from. 

Adittionally, there is a trash bin icon next to each train, which the user can click to delete that entry and keep the train schedule updated.
