# SBOLExplorer Visualization Project

The Synthetic Biology Open Standard ([SBOL](http://sbolstandard.org/sbol-visual-specification/)) defines a data format that represents synthetic genetic building blocks, which may be combined to create genetic constructs or larger, parent synthetic genetic building blocks. This project, SBOLExplorer, aims to visualize this dataset of synthetic genetic parts as well as the inheritance relationships between them. SBOLExplorer will provide a platform to view and navigate SBOL data to give researchers a deeper understanding of genetic building block relationships, a way to explore the composition of certain genetic parts, and a more efficient discovery of their data.

[SBOLExplorer's Website](http://arussellk.azurewebsites.net/)

TODO: Link to Video

Our visualization's website includes a usage guide and any relevant information for course staff. 

## Project Composition

SBOLExplorer is written in TypeScript. 

#### Miscellaneous Files:
`/documents` includes the Process Book and Peer Evaluation documents.
`/build` includes our `html` file, SVG glyphs used in our visualization, and necessary files for the website's build. 
`/src/data` includes our data files. The website gets tree data from a library call, but the search uses the files in       `/data/searchResults` as there's no public endpoint for search data. 

#### Implementation Code: 
`/src/components` includes all implementation for the visualization's front end (search, tree, hover box, and information panel).
`/src/services` includes code that fetches and processes tree and search result data.
`/src/models` includes our data model for trees/genetic parts.
`/src/styles` includes our css file.
`/src/main.ts` is the file where all other functions are called and all data is passed through its code. 

## Start From Source

All documents (Process Book, Project Proposal, etc) are in the /documents folder. 

I am using `npm` version `5.6.0` which is bunled with `node` version `8.11.2`.

```
$ cd /path/to/this/repo/dataviscourse-pr-sbolexplorer
$ npm install
$ npm start
```

The above commands will start a webpack development server.
