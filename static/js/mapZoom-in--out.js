document.addEventListener('DOMContentLoaded', function() {
    var zoomIn = document.querySelector('#zoom-in');
    var zoomOut = document.querySelector('#zoom-out');
    let defaultWidth = 700;
  
    zoomIn.addEventListener('click', function() {
      defaultWidth += 150;
      applyZoom();
    });
  
    zoomOut.addEventListener('click', function() {
      defaultWidth -= 150;
      applyZoom();
    });
  
    function applyZoom() {
      var evsuMap = document.querySelector('#evsu_map');
      evsuMap.style.width = `${defaultWidth}px`;
    }
    document.addEventListener('wheel', function(e) {
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
        }
      });
  });