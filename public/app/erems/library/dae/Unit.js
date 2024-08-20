/*Data Object Element*/
Ext.define("Erems.library.dae.Unit",{
    extend:"Erems.library.Dae",
    requires:["Erems.library.dae.Cluster","Erems.library.dae.Block"],
    idProperty:'unit_id',
    unit_number:'',
    constructor	: function(options){
        this.callParent(arguments);
        this._bindDae = {
            cluster:"cluster_cluster_id",
            block:"block_block_id"
        };
    }
});


