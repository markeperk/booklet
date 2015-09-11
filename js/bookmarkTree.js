(function() {

angular.module('treemark', [])

  .directive('tree', [function() {
    return {
      scope: {
        data: '='
      },
      link: function ($scope, elem, attrs) {
          var canvas = d3.select(elem[0]).append("svg")
            .attr("width", 1200)
            .attr("height", 1000)
            .append("g") 
              .attr("transform", "translate(50, 50)")

          var tree = d3.layout.tree()
            .size([1100, 950]) 

          chrome.bookmarks.getTree(function(bookmarkTree){
            // console.log(JSON.stringify(bookmarkTree))
            var data = bookmarkTree[0];
            console.log("firing", data)
            var nodes = tree.nodes(data); 
            var links = tree.links(nodes)  
            console.log(links) 
            var node = canvas.selectAll(".node")
              .data(nodes) 
              .enter() 
              .append("g")
                .attr("class", "node")
                .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"}) 

            node.append("circle")
              .attr("r", 5)
              .attr("fill", "gray")
            node.append("text")
              .text(function(d) { return d.title; })
              .attr("font-size", 12)

            var diagonal = d3.svg.diagonal()

            canvas.selectAll(".link")
              .data(links) 
              .enter()
              .append("path")
              .attr("class", "link")
              .attr("fill", "none")
              .attr("stroke", "gray")
              .attr("d", diagonal);

          })
        }
      }
    }])
})();
