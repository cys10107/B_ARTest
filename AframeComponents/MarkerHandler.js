AFRAME.registerComponent("info_marker_handler", {
    
    // 參數。本來是想拿來掛不同的Event，但是他無法偵測不同Marker，就算了
    schema: {
        index: {type: 'string', default: "1"}
    },

    init: function () {
        
        // 貌似都是直接掛在 Scene 上
        // Fires when a marker is detected
        this.el.sceneEl.addEventListener("markerFound", () => {
            // Attach output here
            document.getElementById("Displayer").innerHTML = "Tracking";
        });
        // Change the state back after lost track of the marker
        this.el.sceneEl.addEventListener("markerLost", () => {
            // Attach output here
            document.getElementById("Displayer").innerHTML = "Not found";
        });
    }
});