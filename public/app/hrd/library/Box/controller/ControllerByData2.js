// 
/* 
 * 

 * 
 */
Ext.define('Hrd.library.box.controller.ControllerByData2', {
    extend: 'Hrd.library.box.controller.ControllerByData',
    saveOnClick: function() {
        var me = this;

        var f = me.getFormdata();

        var g = me.getMainGrid();

        var v = me.validateData();
        
        var p = me.getPanel();
        
        
        
        if (v.status) {
            
            console.log("SAVEEE ");
            
            var data = me.finalData(f.getValues());
            
            p.setLoading("Saving...");
            
            me.tools.ajax({
                params: data,
                
                success: function(data) {
                    p.setLoading(false);
                    console.log(data);
                    var status = data.success;
                    if(!status){
                        me.tools.alert.warning(data.msg);
                        return;
                    }else{
                         me.tools.alert.info("Saved!");
                         f.getForm().reset();
                         g.getStore().loadPage(1);
                         
                    }
                   
                  
                }
            }).save();
           
        }else{
            me.tools.alert.warning(v.msg);
        }

    }
    
    
    
});