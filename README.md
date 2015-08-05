# This is a table component made with ReactJS. It is made to allow the user to pick out subsets of the table's data to highlight or display by themselves.

````
        <FilterTable  
          subset={[1,5]}  
          functionality={"subset"}  
          getColHeader={this.printHeader}  
          getRange={this.showRange}  
          data={[{"cats/house":10, "kids/house":3},{"cat/house":1, "kids/house":0}]}  
          titles={[{title:"cats/house", display: null},{title:"kids/house", display:null}]}  
        />
````

## Props:  
* subset - an array representing a subset of an array of attributes.
* functionality - "subset" or "highlight", defaults to "subset"
* getColHeader - a callback which returns the header of a column
* getRange - a callback which returns the min and max of an array of attributes
* data - data inputted by user: [{attr1: int, attr2: int,attr3: int}, ...]
* titles - array of title data: [ {title: "attr1", display: "nice title that you want to display"}, ...], if no titles.display, uses titles.titles. title attribute must always match corresponding attribute in data

## Please report all issues here: https://github.com/niole/Table-Highlight-Subset
