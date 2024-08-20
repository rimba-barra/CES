Ext.define('Master.library.box.tools.GridForce', {
    constructor: function(options) {
        Ext.apply(this, options || {});
    },
    /*@params c = controller, g = grid*/
    addEvents: function(g, c) {

        // init grid
        g.doInit();
        var s = g.getStore();
        var me = this;
        s.load({
            params: {
                //state:"load_default_attribute"
            },
            callback: function(rec, op) {
                g.attachModel(op);

                /// add button
                var addButton = g.down("[action=create]");

                if (addButton) {
                    addButton.on("click", function() {
                        me._events().add(g, c);
                    });
                }

                // edit button
                var editButton = g.down("[action=update]");

                if (editButton) {
                    editButton.on("click", function() {
                        me._events().edit(g, c);
                    });
                }

                /// delete button
                var deleteButton = g.down("[action=destroy]");

                if (deleteButton) {
                    deleteButton.on("click", function() {
                        me._events().destroy(g, c);
                    });
                }


            }
        });



    },
    addSaveEvent: function(winId, grid) {
        var win = Ext.getCmp(winId);
        var f = win.down("form");
        var me = this;


        if (f) {
            var saveButton = f.down("[action=save]");

            if (saveButton) {
                saveButton.on("click", function() {
                    me._events().save(f, grid);
                });
            }
        } else {
            console.log("[GridForce] Form tidak ada");
        }



    },
    _events: function() {
        var me = this;
        var x = {
            save: function(form, grid) {
                var vs = form.getForm().getValues();
                var s = grid.getStore();
                if (form.editedRow > -1) {
                    var rec = s.getAt(form.editedRow);
                    rec.beginEdit();
                    rec.set(vs);
                    rec.endEdit();
                } else {
                    s.add(vs);
                }

                form.up("window").destroy();
            },
            add: function(grid, controller) {

                var winId = me.showForm(grid, controller, 'Add');
                console.log(winId);
                var win = Ext.getCmp(winId);
                if (win) {
                    var f = win.down("form");
                    f.editedRow = -1;
                }
            },
            edit: function(grid, controller) {

                var s = grid.getStore();
                var rec = grid.getSelectionModel().getSelection()[0];
                var row = s.indexOf(rec);

                if (rec) {
                    var winId = me.showForm(grid, controller, 'Edit');
                    var win = Ext.getCmp(winId);
                    if (win) {
                        var f = win.down("form");
                        f.loadRecord(rec);
                        f.editedRow = row;
                    }


                } else {
                    console.log("[GridForce] Invalid record to edit");
                }
            },
            destroy: function(grid, controller) {
                var s = grid.getStore();
                var rec = grid.getSelectionModel().getSelection()[0];
                var row = s.indexOf(rec);

                if (rec) {
                    s.removeAt(row);
                    if (s.getCount() > 0) {
                        grid.getSelectionModel().select(0);
                    }
                    if (typeof controller.gfFuncs === 'function') {
                        if (typeof controller.gfFuncs().destroy === 'function') {
                            controller.gfFuncs().destroy(rec);
                        }
                    }

                } else {
                    console.log("[GridForce] Invalid record to delete");
                }
            }
        };
        return x;
    },
    showForm: function(grid, controller, state) {
        var me = this;
        var text = grid.newButtonLabel.split(" ");
        if (text) {
            if (text[1]) {
                text = text[1];
            } else {
                text = 'window';
            }
        }
        var winId = 'my' + controller.controllerName + '' + grid.formFile;

        controller.instantWindow(grid.formFile, 500, state + '' + text, 'create', winId);
        // save button
        me.addSaveEvent(winId, grid);

        if (typeof controller.gfFuncs === 'function') {
            if (typeof controller.gfFuncs().showForm === 'function') {
                controller.gfFuncs().showForm(state);
            }
        }

        return winId;
    }

});