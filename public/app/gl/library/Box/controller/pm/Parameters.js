Ext.define('Gl.library.box.controller.pm.Parameters', {
    extend: 'Gl.library.box.controller.template.Parameters',
    alias: 'controller.pmparameters',

    crudbrFunc: function() {
        var me = this;
        var x  = {
            save: function(form) {

                var validate = me.validateData();
                if (validate.status) {
                    form.setLoading("Please wait...");

                    me.tools.ajax({
                        params: me.finalData(form.getForm().getValues()),
                        success: function(data) {
                            if (data.success) {
                                me.tools.alert.info("Saved");
                                me.saveCallback(data).success();

                            } else {
                                me.tools.alert.warning(data.msg);
                            }
                            form.setLoading(false);


                        }
                    }).save();
                }else{
                    me.tools.alert.warning(validate.msg);
                }
            },

            add: function() {
                me.addClick();
            }
        };
        return x;
    },

    addClick: function() {
    	var me  = this;
    	// alert("asasasasasadasfasfsadf");

    	var f = me.getPanel().down("form");
    	f.getForm().reset();
    }
});