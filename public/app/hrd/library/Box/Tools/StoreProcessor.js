Ext.define('Hrd.library.box.tools.StoreProcessor', {
    moduleName: 'hrd',
    controller:null,
    storeName:null,
    storeId:null,
    idProperty:null,
    id:null,
    store:null, /*store handler*/
    init:function(storeName,newStoreId,idProperty){
        this.storeName = storeName;
        this.id = storeName;
        this.storeId = newStoreId;
        this.idProperty = idProperty;
    },
    create: function(controller) {
        
        this.store = controller.instantStore({
            id: this.storeId,
            extraParams: {
                mode_read: this.storeName
            },
            idProperty:this.idProperty
        });
      
        
    },
    loadModel: function(controller) {
        var params = {};
        params[this.idProperty] = 0;
        var me = this;
        
        me.store.load({
            params: params,
            callback: function(rec, op) {
                controller.attachModel(op,me.store, false);

            }
        });
    },
    loadData: function(value,controller,callback) {
         var params = {};
        params[this.idProperty] = value;
        var me = this;
       
        me.store.load({
            params: params,
            callback: function(rec, op) {
                
                controller.attachModel(op,me.store, false);
                if(rec.length > 0){
                    controller.getFormdata().loadRecord(me.store.getAt(0));
                }else{
                    Ext.Msg.alert('Status', 'Record not found.');
                }
                if(typeof callback==="function"){
                    callback();
                }
                
                
            }
        });
    }
});

