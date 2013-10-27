(function(window){
	// General utitlities
	var doc = window.document,
			$ = function(selector){
				var result = doc.querySelectorAll(selector);
				return (result.length > 1) ? result : result[0];
			};

	Node.prototype.on = Node.prototype.addEventListener;
	NodeList.prototype.on = function(type, func, async) {
		[].forEach.call(this, function(node, index) {
			node.on(type, func, async);
		});
	};

	// Start app related code here
	var upload = $('#upload');
	var imgContainer = $('.img');
	alert(upload);

	upload.on('click', function(e) {
		alert("Clicked");
		// use moz activity api to upload photos
		var activity = new MozActivity({
			name: 'pick',
			data: {
				type: ['image/png', 'image/jpg', 'image/jpeg']
			}
		});

		activity.onsuccess = function(e) {
			alert("success");
			var image = this.result;

			var reader = new FileReader();
			reader.onload = function(e) {
				var imageData = e.target.result;

				alert(imageData);
				var base64Content = imageData.substring(imageData.indexOf(',') + 1, imageData.length);
    		var fileType = imageData.substring(imageData.lastIndexOf(":")+1, imageData.lastIndexOf(";"));
    		var fileName = "newImage.png";

    		var img = new Image();
    		img.src = imageData;
    		img.setAttribute('data-base64', base64Content);
    		img.setAttribute('data-name', fileName);
    		img.setAttribute('data-type', fileType);

    		imgContainer.appendChild(img);
			};
			reader.readAsDataURL(image.blob); // convert the blob from clipboard to base64

		};

		return false;

	}, false);

}(this));