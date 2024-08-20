Ext.define('Gl.library.component.Combobox', {
    extend: 'Ext.form.field.ComboBox',
    queryMode: 'local',
    constructor:function(configs){
       // console.log(this.store);
      // this.store = null;
        console.log(this.store);
        this.callParent(arguments);
        
    },
    beforeRender: function() {
        var me = this;
        var store = Ext.StoreManager.lookup(me.store);        

    },
    initComponent: function() {
        var me = this;
        
        me.callParent(arguments);

    },
    getSelectedVal: function(nameField, idValue) {
        var me = this;
        var s = me.getStore();
        var hasil = '';
        if (typeof nameField != 'undefined' && typeof idValue != 'undefined') {
            var rec = s.getById(idValue);
            if(rec!==null){
                hasil = rec.get(nameField);
            }
            return hasil;
       
        } else {
            var rec = s.getById(me.getValue());
            if(rec!==null){
                hasil = rec.get(me.displayField);
            }
            return hasil;
            
        }


    }
});


