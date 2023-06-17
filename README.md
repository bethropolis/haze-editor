# Haze Editor
![Haze Editor](githubassets/haze.png)

Haze Editor is an HTML, CSS, and JS code editor with version management, integrated Todo app, plugins, and more.

LIVE: [haze-editor.vercel.app](https://haze-editor.vercel.app)
BACKUP: [bethropolis.github.io/haze-editor](https://bethropolis.github.io/haze-editor/)


## Table of Contents
- [Haze Editor](#haze-editor)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Installation](#installation)
  - [Features](#features)
    - [Code editor](#code-editor)
    - [version management](#version-management)
    - [Library management](#library-management)
    - [Todo app](#todo-app)
    - [Plugins](#plugins)
    - [More](#more)
  - [Plugins](#plugins-1)
    - [building a plugin/theme](#building-a-plugintheme)
    - [testing a plugin/theme](#testing-a-plugintheme)
  - [Issues](#issues)
  - [License](#license)

## Introduction
Haze Editor is a HTML, CSS, and JS code editor that provides version management, integrated Todo app, plugins, and more. It was developed as a fun project and we hope you enjoy using it.

## Installation
To install and run Haze Editor locally, follow these steps:

```shell
git clone https://github.com/bethropolis/haze-editor.git
cd haze-editor
npm install
```

You can use the following command to run it:
```
npm run dev
```
To build for deployment, use the command:
```
npm run build
```

## Features
- Code editor
- Version management
- Library management
- Todo app
- Plugins
- more


### Code editor
The code editor in Haze Editor supports HTML, CSS, and JS. It provides features such as syntax highlighting, auto-completion, embedded browser preview, code export, and code import.

![](githubassets/code.png)

### version management
 It comes with a built-in custom-made version control system, allowing you to manage and track changes to your code effectively.
 ![](githubassets/git.png)

### Library management
This allows you to manage external JS & CSS libraries.
The `cdnjs API` is used to search and get the latest version of a library.

![](githubassets/Libraries.png)

### Todo app
This is an in-built todo list app.
You can use it to keep track of your tasks, and mark them as done.

![](githubassets/todo.png)

### Plugins
Extend and customize the editor by adding `plugins` and `themes`. `Plugins` allow you to enhance the functionality of the editor, while `themes` provide different visual styles.

![](githubassets/plugins.png)

### More
- Themes: Customize the visual appearance of the editor with various themes.
    ![](githubassets/dark.png)
    <br><br>
- Settings: Configure the editor according to your preferences.
    ![](githubassets/settings.png)




## Plugins

Plugins allow you to personalize and extend the Editor;
### building a plugin/theme
To build a plugin you need to create a json file with the following structure:
```json
 {
  "name": "Aura Theme",
  "description": "A beautiful and elegant theme with a soothing color scheme.",
  "version": "1.0.0",
  "type": "theme", 
  "file": "path/to/theme/file.css",
  "author": "John Doe"
}

 ```

`"name"`: The name of the plugin or theme<br>
`"description"`: A brief description of its features or visual style<br>
`"version"`: The version number of the plugin or theme<br>
`"type"`: Specify whether it is a "plugin" or a "theme"<br>
`"file"`: The path to the CSS/JS file that contains the styling or functionality of the plugin or theme.<br>
`"author"`: The name of the author or creator of the plugin or theme<br>


### testing a plugin/theme
To try out your plugin or theme, open the Haze Editor, go to the Plugins section, and click the "Load plugin" button.

Themes can also be tested and edited directly in the editor.<br/>
Naigate to settings > turn on Theme Editor Mode.

## Issues
If you encounter any problems or have suggestions for improvement, please report them on [Github issues](https://github.com/bethropolis/haze/issues).
## License
Nothing says more open source than MIT. <br><br>
Happy Coding! 💜

