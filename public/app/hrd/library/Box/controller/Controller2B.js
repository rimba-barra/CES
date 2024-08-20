// 
/* 6 Desember 2014
 * 
 * Extending from Controller 2 special for module that use employee grid for resource
 * 
 */
Ext.define('Hrd.library.box.controller.Controller2B', {
    extend: 'Hrd.library.box.controller.Controller2',
    getProcessingEl:function(){
        var me = this;
        var x = {
            getForm:function(){
                return me.getFormdata();
            },
            getGrid:function(){
                return me.getGrid();
                /// used for on Delete Button in main grid
            }
        }
        return x;
    },
    afterCallNew: function() {
        
        var me = this;
      
        var g = me.getGrid();
        me.getFormdata().editedRow = -1;
        me.disableTBButtonsOnGrid(true);

        var x = me.addNewRecord();
    
        if (!x) {
            me.disableTBButtonsOnGrid(false);
        }
    },
    gridSelectionChange: function() {
        var me = this;
        me.callParent(arguments);
        me.getGrid().down("toolbar button[action=delete]").setDisabled(true);
        //me.getGrid().down("toolbar button[action=edit]").setDisabled(true);
        var g = me.getGrid();
        var f = me.getFormdata();
        var rec = g.getSelectedRecord();
        if (rec) {
            f.editedRow = rec.index;
            f.loadRecord(rec);
            me.afterSelectionChange(rec);
        }





    },
    afterSelectionChange:function(rec){
        
    },
    editOnClick: function() {
        var me = this;
        me.tools.formHelper(me.getProcessingEl().getForm()).readOnly(false);
        me.disableTBButtonsOnGrid(true);
        var g = me.getProcessingEl().getGrid();
        me.editRecord(g.getSelectedRecord());

    },
    editRecord:function(selectedRec){

    },
    deleteOnClick: function() {
        var me = this;

        var g = me.getProcessingEl().getGrid();
        var rec = g.getSelectedRecord();
        if (rec) {
            Ext.Msg.show({
                title: 'Confirm Delete',
                msg: 'Are you sure you want to delete this record?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function(clicked) {
                    if (clicked === "yes") {

                        me.confirmDeleteOnClick(g.getStore(), rec, me.getPanel().up("window"));
                    }
                }
            });
        }



    },
    saveOnClick: function() {
        var me = this;

        var f = me.getProcessingEl().getForm();
    
        var g = me.getProcessingEl().getGrid();
        me.insSave({
            form: f,
            grid: g,
            // store: me.localStore["detail"].store,
            store: g.getStore(),
            finalData: function(data) {
                 return me.getFinalData(data);
                 
            },
            sync: true,
            callback: {
                create: function(store, form, grid) {
                      console.log("after save");
                }
            }
        });
    },
    getFinalData:function(data){
        return data;
    },
    
    


});