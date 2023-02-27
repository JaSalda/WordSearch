# WordSearch
This code was built using Razor Pages, JavaScript(where most of the business logic is)
NuGet Install
:Microsoft.EntityFrameworkCore
:EntityFrameworkCore.Tools
:AspNetCore.Mvc.Razor.runtimecompilation

Run:
1. Run on ISS Express
2. Once page is opened you will be introduced with the index page that shows an example grid and word search guidelines from the given project
[click "Create New WordSearch"]
3.Rules for running
-my code wont generate if you place the words before the grid size, yet currently working on setting up my if statements to not generate but thats a debug on my side
-you cant generate another size matrix from the given MySize input, you will get a overtime running error
-if you want to build a new word search clicking Rebuild will force you to another page
[note that my rebuild function isnt the correct rebuild function for that it doesnt reload my current stated grid (still working on that debug)]
[rebuild wont save my words from my last array so you have re-input word list]
-I was having problems with my grid for the fact that my nested for loops are generating a corrected size matrix but if you set the MYSIZE == 12 in your input field
you will generate a perfect matrix (currently still debugging that).
4. Input the size of the matrix ( you can play with this but you have to refresh the page every time you want to try a new input )
[MYSIZE has to == 12 if you want a perfect grid]
<====== this will generate the matrix size =====>
5. input the list of words (im still working on indexing an array to read out each element to compare the grid size but since my grid size is perfect at a 12x12
(but really a 13x13) the word box is limited to 10 words
<==== this will place the words in the box as stated in the project next to the grid ===>

for this demo i kept the words highlighted so that we can see that they are being correctly placed onto the grid.
