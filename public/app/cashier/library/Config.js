Ext.define("Cashier.library.Config",{
    IMAGE_FOLDER:'app/erems/uploads/',
    getImageFolder:function(controllerName){
        return this.IMAGE_FOLDER+''+controllerName+'/';
    }
});


