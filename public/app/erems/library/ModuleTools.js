Ext.define('Erems.library.ModuleTools', {
    customerPhoto: function(photoEl,imageName,folder,size) {
        var extension = imageName.substr((imageName.lastIndexOf('.') +1));
        var s = size?size:'150px 200px';
        var w 	= s.split(" ")[0];
        var h 	= s.split(" ")[1];

        switch(extension){
            case 'jpg':
            case 'jpeg':
            case 'png':
            	photoEl.removeAll();
        		photoEl.el.setStyle({backgroundImage: 'url(' + folder + imageName + ')', backgroundSize: s});
            break;
            case 'pdf':
                var pdfPanel = new Ext.Component({                    
                        autoEl: {
                        tag: 'iframe',
                        style: 'height: 100%; width: 100%;',
                        src: folder+imageName
                    },
                    height: h,
                    id: 'pdf_iframe',
                    width: w
                });

        		photoEl.add(pdfPanel);
            break;
            default:
            	photoEl.removeAll();
        		photoEl.el.setStyle({backgroundImage: 'url(' + folder + imageName + ')', backgroundSize: s});
            break;
        }
    }
});