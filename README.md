# Welcome to Bello!

## How to install
---
run this snippet in your terminal
```
git clone git clone https://phllpbll@bitbucket.org/inspacechat/phillip.git
```


## How to run
---
CD to the directory you cloned and run
`yarn start`
in your terminal


## Making changes
---

This project is divided into 4 main sections in in the `src` folder.

They are `Components, Pages, Redux, and Styles`

assets is used to store images or other things that will be required throughout the code. 

### Components
---
The Components folder contains all of the React code that stores individual components. Each component is given their own folder and a nested component folder within to organize other code that may be required and unique to that component.

Some examples of things in the Component folder are the Boards, Cards, and navbar to start. The wall is what brings all of the previous mentioned components together.

To add a React component add it to the Component folder. If it will be unique to a particular component, then add it to the respective nested folder instead.

### Pages
---
The Pages folder is used to bring react components together into concise pages.

Project in this folder is responsible for bringing the navbar and the project wall (the wall component) together to make the page.

### Redux
---
The Redux folder houses all of the Redux logic for global state management.

It uses a wallslice file to make state management for a project wall (contains board data and card data). To add to global state management add more slice files, then import them into store to use them in the project.

The helper file is used to clean up some of the Redux code by moving complex logic to the helpers file.

### Styles
---
The styles folder is used for all of the projects Scss code.


#### *`_base`*
All of the styles that are used for every webpage (like typography and root changes) are placed in the base folder.

#### *`_abstract`*
All of the functions, mixins, and variables are stored in this folder

#### *`_components`*
All of the styles for each component are divided into a respective component file that relates to it. for instance the navbar styles are stored in a `navbar.scss` file here.

#### *`_layout`*
All of the styles that manage the positioning and size of a component are placed here and imported into the respective component folder. For instance the color of the navbar would be placed in the `_components/navbar.scss` file, although the positioning of all of the divs including the navbar class itself are stored in the `_layout/navbar.scss`.

#### *`_pages`*
After all of the styles are created in the previous folders they are then imported to their respecive page file. From here it is compiled using the `sass {path/to/sass/page} {path/to/css/output}` command


