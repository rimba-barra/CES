Ext.define('Cashier.library.ModuleTools', {
    customerPhoto: function(photoEl,imageName,folder,size) {
        var s = size?size:'150px 200px';
        photoEl.el.setStyle({backgroundImage: 'url(' + folder + imageName + ')', backgroundSize: s});

    }
});