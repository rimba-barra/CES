Ext.define('Erems.library.StoreCreator', {
    appName: 'erems',
    model: 'model',
    apiController:'',
    idProperty:'field_id',
    storeId:'store_cretator_id',
    constructor: function(data) {
        for(var x in data){
            if(typeof this[x] != 'undefined' && this[x] !='function'){
                this[x] = data[x];
            }
        }
        
    },
    
    build: function() {
        var that = this;
   
        var myStore = Ext.create('Ext.data.Store', {
            model: that.model,
            storeId:that.getStoreId(),
            proxy: {
                type: 'ajax',
                actionMethods: that.getActionMethods(),
                api: that.getApi(),
                reader: {
                    type: 'json',
                    idProperty: that.idProperty,
                    root: 'data'
                },
                writer: {
                    type: 'json',
                    encode: true,
                    root: 'data'
                }
            }
        });
        return myStore;
    },
    getStoreId:function(){
        return this.storeId;
    },
    getActionMethods: function() {
        return {
            read: 'POST',
            create: 'POST',
            update: 'POST',
            destroy: 'POST'
        };
    },
    getApi: function() {
        var a = this.appName;
        var b = this.apiController;
        return {
            read: a+'/'+b+'/read',
            create: a+'/'+b+'/create',
            update: a+'/'+b+'/update',
            destroy: a+'/'+b+'/delete'
        };
    }

});