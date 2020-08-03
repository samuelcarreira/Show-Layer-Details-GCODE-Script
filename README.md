# Show Layer Details GCODE Script

A simple offline script to process your ideaMaker Slicer generated GCODE and add more details: current and total layers, layer height and type of structure

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

## **WARNING: This is a work in progress!**

![Details](label.png)

## How to use
- Open the webpage
- Click Upload
- Save the processed GCODE file

![Preview](lcd-mockup.png)


## Motivation and history
I've decided to write this simple script as a proof of concept/personal challenge: can I process a large text file without needing to write a dedicated app with native file access.
After I browse the web to check the current HTML specifications, I found that the HTML5 File API will be a feasible candidate for this type of project.
So with a few lines of code and some NPM libraries, I wrote this simple script to process my GCODE files. Because I am currently learning Angular, I've decided to give a chance to this technology and use it to create the UI (I know that it's overkill, but it's better to start with a small project).

## Other slicers 
### Cura
Use this Plugin https://github.com/AmedeeBulle/ShowLayer

### Prusa Slicer
Use the following option on

### Simplify3D
...

### ideaMaker (just add the current layer)
...


## Acknowledgments

* Inspired on [ShowLayer script](https://github.com/AmedeeBulle/ShowLayer/blob/master/scripts/ShowLayer.py) by Philippe Vanhaesendonck


## License

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
- Copyright 2020 © <a href="http://samuelcarreira.com" target="_blank">Samuel Carreira</a>.
