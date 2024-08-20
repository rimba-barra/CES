Ext.define('Erems.library.ScheduleAddAdvance', {
	requires : ['Erems.library.box.tools.DateX'],
	proses   : function(controller,formadv,gridSchedule) {
		var me = controller;
		var vs = formadv.getValues();
		var g  = gridSchedule;
		
		var jml          = me.tools.intval(vs.help_jml);
		var terminMulai  = me.tools.intval(vs.help_termin);
		var nilaiTagihan = accounting.unformat(vs.help_amount);
		var sourcheMoney = "CUSTOMER";
		var startDate    = new Erems.library.box.tools.DateX({
			date : vs.help_tgl
		});

		if (jml === 0) {
			me.tools.alert.warning("Jumlah tagihan harus di atas nol.");
			return;
		}
		if (startDate.length < 2) {
			me.tools.alert.warning("Tangal tidak valid.");
			return;
		}
		if (terminMulai < 1) {
			me.tools.alert.warning("Termin mulai harus lebih besar dari nol.");
			return;
		}
		if (nilaiTagihan < 1.0) {
			me.tools.alert.warning("Nilai tagihan harus lebih besar dari nol.");
			return;
		}


		var s = g.getStore();
		var totalRecord = s.getCount();
		var lastRec = s.getAt(totalRecord - 1);
		var count = 0;

		// var newDate = startDate.addMonth(1);
		for (var i = 1; i <=jml; i++) {
		  //  var  newDate = startDate.addMonthOld(count);
		  if(vs.help_tgl != ''){
			  var temp = vs.help_tgl.split(" ");
			  var newDate = moment(temp[0],"YYYY-MM-DD");
			  //console.log(newDate);
			  if(count > 0){
				   newDate.add(count, 'M');
			  }
			  var dateValue = newDate.toDate();
		  }else{
			  var dateValue = "00-00-0000";
		  }
		 // console.log(newDate.format("DD-MM-YYYY"));
	 
			s.add({
				duedate: dateValue,
				scheduletype_scheduletype: me.tools.comboHelper(formadv.down("[name=help_tipe]")).getText({d:'scheduletype',v:'scheduletype_id'}),
				termin: terminMulai+count,
				remaining_balance: nilaiTagihan,
				sourcemoney_sourcemoney: lastRec?lastRec.get('sourcemoney_sourcemoney'):"",
				amount: nilaiTagihan
			});
		   
			count++;
		}
	}
});

