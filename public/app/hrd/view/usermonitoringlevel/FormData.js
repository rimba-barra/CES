Ext.define('Hrd.view.usermonitoringlevel.FormData', {
    alias: 'widget.usermonitoringlevelformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: [],
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    initComponent: function () {
        var me = this;
      //  var cbf = new Hrd.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: {},
            items: [
				{
                    xtype: 'hiddenfield',
                    name: 'access_id',
                },
                {
                    xtype: 'combobox',
                    name: 'accesslevel_id',
                    fieldLabel: 'Access Level',
                    width: 400,
                    displayField: 'accesslevel',
                    valueField: 'accesslevel_id',
                    //action: 'resetdetail',
                    readOnly: false,
                    allowBlank: false,
                    matchFieldWidth: false,
					selectOnFocus :true,
					queryMode: 'local',
                    tpl: Ext.create('Ext.XTemplate',
                    '<table class="x-grid-table" width="500px" >',
                      '<tr class="x-grid-row">',
                          '<th width="50px"><div class="x-column-header x-column-header-inner">Level</div></th>',
                          '<th width="150px"><div class="x-column-header x-column-header-inner">Name</div></th>',
                      '</tr>',
                      '<tpl for=".">',
                          '<tr class="x-boundlist-item">',
                              '<td ><div class="x-grid-cell x-grid-cell-inner">{index_no}</div></td>',
                              '<td><div class="x-grid-cell x-grid-cell-inner">{accesslevel}</div></td>',                              
                          '</tr>',
                      '</tpl>',
                   '</table>'
                    )
                },
				{
					xtype       : 'combobox',
					name        : 'employee_id',
					fieldLabel  : 'Employee Name',
					displayField: 'employee_name',
					valueField  : 'employee_id',
					//labelWidth	: 150,
					width       : 400,
                    readOnly: false,
					allowBlank	: false,
                    matchFieldWidth: false,
					selectOnFocus :true,
					queryMode	: 'local',
					tpl: Ext.create('Ext.XTemplate',
					'<table class="x-grid-table" width="500px" >',
					  '<tr class="x-grid-row">',
						  '<th width="250px"><div class="x-column-header x-column-header-inner">Name</div></th>',
						  '<th width="250px"><div class="x-column-header x-column-header-inner">Position</div></th>',
					  '</tr>',
					  '<tpl for=".">',
						  '<tr class="x-boundlist-item">',
							  '<td ><div class="x-grid-cell x-grid-cell-inner">{employee_name}</div></td>',
							  '<td><div class="x-grid-cell x-grid-cell-inner">{position}</div></td>',                              
						  '</tr>',
					  '</tpl>',
				   '</table>'
					)
				},
				{
                    fieldLabel: '',
					xtype: 'checkbox',
					name: 'access_commitee',
					inputValue: '1',
                            uncheckedValue: '0',
					boxLabel: 'Access to PM Commite'
				}],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },
    generateDockedItem: function () {
        var x = [
            {
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                layout: {
                    padding: 6,
                    type: 'hbox'
                },
                items: [
                    {
                        xtype: 'button',
                        action: 'save',
                        itemId: 'btnSave',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-save',
                        text: 'Save'
                    },
                    {
                        xtype: 'button',
                        action: 'cancel',
                        itemId: 'btnCancel',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-cancel',
                        text: 'Cancel',
                        handler: function () {
                            this.up('window').close();
                        }
                    }
                ]
            }
        ];
        return x;
    },
});