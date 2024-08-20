Ext.define('Hrd.library.jofa.Tools', {
    constructor: function(options) {
        Ext.apply(this, options || {});
    },
    changeState: function(sys,state) {
        var g = this.getGrid(sys);
        switch (state) {
            case 'FIRST':
                g.down("toolbar button[action=save]").setDisabled(true);
                g.down("toolbar button[action=cancel]").setDisabled(true);
                g.down("toolbar button[action=create]").setDisabled(false);
                g.down("toolbar button[action=edit]").setDisabled(true);
                g.down("toolbar button[action=delete]").setDisabled(true);
                break;
            case 'ONSELECT':
                g.down("toolbar button[action=save]").setDisabled(true);
                g.down("toolbar button[action=cancel]").setDisabled(true);
                g.down("toolbar button[action=create]").setDisabled(false);
                g.down("toolbar button[action=edit]").setDisabled(false);
                g.down("toolbar button[action=delete]").setDisabled(false);
                break;
            case 'ONNEW':
                g.down("toolbar button[action=save]").setDisabled(false);
                g.down("toolbar button[action=cancel]").setDisabled(false);
                g.down("toolbar button[action=create]").setDisabled(true);
                g.down("toolbar button[action=edit]").setDisabled(true);
                g.down("toolbar button[action=delete]").setDisabled(true);
                break;
            
        }
    },
    getGrid:function(sys){
        return sys.getc().getGrid();
    },
    disableEdit:function(sys,mode){
        console.log('jalan');
        this.getGrid(sys).down("toolbar button[action=edit]").setDisabled(mode);
    }
    



});


