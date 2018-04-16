$(function () {
    
    // Create list of cats in memory
    var catList = [];
    
    // Keep track of currently displayed cat
    var currentCat;
    
    var model = {
        
        // Initialise data
        init: function () {
            // Create array of cats
            var cats = [
                {id: 1, src: "img/cat1.jpg", name: "Smokey", clicks: 0},
                {id: 2, src: "img/cat2.jpg", name: "Socks", clicks: 0},
                {id: 3, src: "img/cat3.jpg", name: "Simba", clicks: 0},
                {id: 4, src: "img/cat4.jpg", name: "Puddles", clicks: 0},
                {id: 5, src: "img/cat5.jpg", name: "Geoff", clicks: 0}
            ];
            // Iterate over cats and add to global array variable
            cats.forEach(function (cat) {
                model.add(cat);
            });
            // Set default cat
            currentCat = cats[0];
        },
        
        // Add new item
        add: function (obj) {
            catList.push(obj);
        },
        
        // Return all items for sidebar
        getAllItems: function () {
            return catList;
        },
        
        // Return current number of clicks for current cat
        getNumberOfClicks: function () {
            return currentCat.clicks;
        },
        
        // Changes the current cat
        changeCat: function (id) {
            currentCat = catList[id];
        }
        
    };
    
    var controller = {
        
        // Initialise model data then render view
        init: function () {
            model.init();
            view.init();
        },
        
        // Returns all items for the sidebar
        getAllItems: function () {
            return model.getAllItems();
        },
        
        // Function to get number of clicks and return display string
        getNumberOfClicks: function () {
            var clicks = model.getNumberOfClicks();
            var textToDisplay = '';
            switch (clicks) {
                case 0:
                    textToDisplay = 'Click on the cat to increase the count!';
                    break;
                case 1:
                    textToDisplay = 'Clicked ' + clicks + ' time!';
                    break;
                default:
                    textToDisplay = 'Clicked ' + clicks + ' times!';
                    break;
            }
            return textToDisplay;
        },
        
        // When a user clicks a sidebar list item
        changeCat: function (id) {
            model.changeCat(id);
            view.renderContent();
        },
        
        // Increase click count for current cat and render view
        addClick: function () {
            currentCat.clicks += 1;
            view.renderContent();
        }
        
    };
    
    var view = {
        
        // Initialise view
        init: function () {
            this.catName = $('#cat-name');
            this.catImage = $('.cat-image');
            this.catCount = $('#cat-count');
            
            view.renderSidebar();
            view.renderContent();
        },
        
        // Separate sidebar so as to not load full page on every image refresh
        renderSidebar: function () {
            
            // Clear all list items
            $('#cat-list').empty();
            
            // Get all cats and append to list
            controller.getAllItems().forEach(function (cat) {
                $('#cat-list').append('<li><a id='
                                      + cat.id
                                      + ' class="cat-click" href="javascript:void(0)" >' 
                                      + cat.name 
                                      + '</a></li>'
                );
                
                // When user clicks list item
                $('#cat-list').bind('click', function (event) {

                    // Get id of clicked element (Adjust for zero based array)
                    var id = parseInt(event.target.id -1, 0);

                    // Change current cat
                    controller.changeCat(id);
                });

            });
            
            // Render view with new cat
            view.renderContent();
        },
        
        // Clear main content (not sidebar)
        clearContent: function() {
            
            this.catName.html('');
            this.catImage.html('');
            this.catCount.html(controller.getNumberOfClicks());
            
        },
        
        // Render main contents (not sidebar)
        renderContent: function () {
            
            view.clearContent();
            
            if (currentCat == null){
                currentCat = controller.changeCat(0);
            }
            
            // Display name for current cat
            this.catName.html(currentCat.name);
            
            // Display image for current cat
            this.catImage.append('<img id="cat-image" class="cat-image" src="' 
                                 + currentCat.src 
                                 + '" alt="' 
                                 + currentCat.name 
                                 + ' the cat.">'
            );
            
            // When user clicks an image
            $('#cat-image').bind('click', function (event) {
                controller.addClick();
            });
            
            // Display number of clicks for current cat
            this.catCount.html(controller.getNumberOfClicks());
            
        }
        
    };
    
    // Render page
    controller.init();
    
}); 