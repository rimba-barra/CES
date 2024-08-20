Ext.define('Erems.model.Mastertype', {
    extend: 'Ext.data.Model',
    alias: 'model.mastertypemodel',

    idProperty: 'type_id',

    fields: [
    	{"name":"type_id","mapping":"type.type_id"},
    	{"name":"code","mapping":"type.code"},
    	{"name":"productcategory_id","mapping":"type.productcategory_id"},
    	{"name":"cluster_id","mapping":"type.cluster_id"},
    	{"name":"name","mapping":"type.name"},
    	{"name":"land_size","mapping":"type.land_size"},
    	{"name":"building_size","mapping":"type.building_size"},
    	{"name":"floor_size","mapping":"type.floor_size"},
    	{"name":"floor","mapping":"type.floor"},
    	{"name":"bedroom","mapping":"type.bedroom"},
    	{"name":"bathroom","mapping":"type.bathroom"},
    	{"name":"electricity","mapping":"type.electricity"},
    	{"name":"width","mapping":"type.width"},
    	{"name":"long","mapping":"type.long"},
    	{"name":"kelebihan","mapping":"type.kelebihan"},
    	{"name":"building_class","mapping":"type.building_class"},
    	{"name":"salesgroup","mapping":"type.salesgroup"},
    	{"name":"description","mapping":"type.description"},
    	{"name":"floorplan_leftaccess","mapping":"type.floorplan_leftaccess"},
    	{"name":"floorplan_rightaccess","mapping":"type.floorplan_rightaccess"},
        {"name":"launching_start","mapping":"type.launching_start"},
        {"name":"launching_end","mapping":"type.launching_end"},

    	{"name":"cluster_cluster_id","mapping":"cluster.cluster_id"},
    	{"name":"cluster_code","mapping":"cluster.code"},
    	{"name":"cluster_cluster","mapping":"cluster.cluster"},
    	{"name":"productcategory_productcategory_id","mapping":"productcategory.productcategory_id"},
    	{"name":"productcategory_project_id","mapping":"productcategory.project_id"},
    	{"name":"productcategory_pt_id","mapping":"productcategory.pt_id"},
    	{"name":"productcategory_code","mapping":"productcategory.code"},
    	{"name":"productcategory_productcategory","mapping":"productcategory.productcategory"},
    	{"name":"productcategory_description","mapping":"productcategory.description"},
    	{"name":"typeattribute"},
    	{"name":"deletedRows"}
    ]
});