<?php

/**
 * Description of Default
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Suratperingatan_CiputraInternational
{
	function getRomawi($tanggal){		
        $pecahkan = explode('-', $tanggal);
        $bln = $pecahkan[1];
		switch ($bln){
			case 1: 
				return "I";
				break;
			case 2:
				return "II";
				break;
			case 3:
				return "III";
				break;
			case 4:
				return "IV";
				break;
			case 5:
				return "V";
				break;
			case 6:
				return "VI";
				break;
			case 7:
				return "VII";
				break;
			case 8:
				return "VIII";
				break;
			case 9:
				return "IX";
				break;
			case 10:
				return "X";
				break;
			case 11:
				return "XI";
				break;
			case 12:
				return "XII";
				break;
		}
	}
    function tgl_indo($tanggal)
    {
        $bulan = array(
            1 =>   'Januari',
            'Februari',
            'Maret',
            'April',
            'Mei',
            'Juni',
            'Juli',
            'Agustus',
            'September',
            'Oktober',
            'November',
            'Desember'
        );
        $pecahkan = explode('-', $tanggal);
        return $pecahkan[2] . ' ' . $bulan[(int)$pecahkan[1]] . ' ' . $pecahkan[0];
    }

    public function getListTagihanHTML($params)
    {
        $schedule = $params["schedule"][0];
        $total = 0.0;
        $ttldenda_terlambatb = 0;
        $ttlremaining_balance = 0;
        $table = "";
		// $duedate_awal = $schedule[0]['duedate'];
		// if($schedule[0]['duedate'] == '2021-04-10 00:00:00.000'){
			$duedate_awal = date('Y-m-d', strtotime("+120 day", strtotime($schedule[0]['duedate'])));
		// }else{
			// $duedate_awal = date('Y-m-d', strtotime("+60 day", strtotime($schedule[0]['duedate'])));
		// }		
		
        foreach ($schedule as $row) {
            if ($row['indicatorname'] == 'denda') {
                $denda = $row["remaining_denda"];
            } else {
                $denda = $row["remaining_denda"];
            }
            $ttldenda_terlambatb = $ttldenda_terlambatb + round($denda);
            $ttlremaining_balance = $ttlremaining_balance + $row["remaining_balance"] ;
			if($row["duedate"]<$duedate_awal){
				$table .= '<tr>
							<td>' . $this->tgl_indo(date('Y-m-d', strtotime($row["duedate"]))) . '</td>
							<td>'.$row["description"].'</td>
							<!-- <td align="right">Rp. ' . number_format($row["remaining_balance"] + round($denda)) . '</td> -->
							<td align="right">Rp. ' . number_format($row["remaining_balance"]). '</td>
							<td align="right">'.$row["selisih_hari"].'</td>
                            <td align="right">Rp. ' . number_format($denda) . '</td>
						</tr>';
				}
        }

        $table .= '<tr>
                    <td colspan="2" align="center"><b>Total Tunggakan</b></td>
                    <!-- <td align="right">Rp. ' . number_format($ttlremaining_balance + $ttldenda_terlambatb) . '</td> -->
					<td align="right">Rp. ' . number_format($ttlremaining_balance) . '</td>
                    <td align="right"></td>
					<td align="right">Rp. ' . number_format($ttldenda_terlambatb) . '</td>
					
				   </tr>';

        return $table;
    }

    public function getHTMLdefault()
    {
        return $this->getHTML();
    }

    public function getHTML($spke = null, $data)
    {
		if($data["sp_surat_ke"] == 1){
			$tgl_print_duedate = date('Y-m-d', strtotime("+60 day", strtotime($data['duedate_awal'])));
		}else if($data["sp_surat_ke"] == 2){
			$tgl_print_duedate = date('Y-m-d', strtotime("+90 day", strtotime($data['duedate_awal'])));
		}else if($data["sp_surat_ke"] == 3){
			$tgl_print_duedate = date('Y-m-d', strtotime("+120 day", strtotime($data['duedate_awal'])));
		}else{
			$tgl_print_duedate = date('Y-m-d', strtotime("+150 day", strtotime($data['duedate_awal'])));
		}
		$tgl_print_max = $this->tgl_indo(date('Y-m-d', strtotime("+14 day", strtotime($tgl_print_duedate))));
		$tgl_print = $this->tgl_indo($tgl_print_duedate);
        $tgl_print_sp4 = $this->tgl_indo(date('Y-m-d', strtotime("0 day")));
		$tgl_print_tempo = $this->tgl_indo(date('Y-m-d', strtotime("7 day")));
        // $tgl_print14 = $this->tgl_indo(date('Y-m-d', strtotime("14 day"))); //default 0 day
        // $tgl_print60 = $this->tgl_indo(date('Y-m-d', strtotime($data["duedate60"])));
        $nomor_sp_teratas = $data["nomor_sp_teratas"];
        $a = explode('/', $nomor_sp_teratas);
        $b = (int)($a[0]);
        if (substr($b, 0, 1) == "0") {
            $nomor_sp_teratas = $data["nomor_terakhir"];
        }
		$nomor_sp_teratas =  str_replace($a[2],$this->getRomawi(date('D-M-Y')),$nomor_sp_teratas);
		//$nomor_sp_teratas =  str_replace($a[2],$this->getRomawi(date('d-m-Y', strtotime("0 day"))),$nomor_sp_teratas);
        $word = "";
        if ($data['total_schedule'] > 0) {
            //$page_break = "<div style='page-break-before:always;'><br/><br/><br/><br/><br/></div>";
            $page_break = "";
        } else {
            $page_break = "";
        }
        if ($data['is_printpreview'] == 1) {
            $namafile = trim($data['cluster'] . '_' . $data['unit_number']) . '_' . date('d-m-Y');
            $word = "
                <script>
                    function Export2Doc(element, filename = ''){
                        var preHtml = \"<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>\";
                        var postHtml = \"</body></html>\";
                        var html = preHtml+document.getElementById(element).innerHTML+postHtml;
                        var blob = new Blob(['\ufeff', html], {
                            type: 'application/msword'
                        });
                        var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
                        filename = filename?filename+'.doc':'document.doc';
                        var downloadLink = document.createElement('a');
                        document.body.appendChild(downloadLink);
                        if(navigator.msSaveOrOpenBlob ){
                            navigator.msSaveOrOpenBlob(blob, filename);
                        }else{
                            downloadLink.href = url;
                            downloadLink.download = filename;
                            downloadLink.click();
                        }                        
                        document.body.removeChild(downloadLink);
                    }
                </script>
                <button onclick=\"Export2Doc('exportContent', '$namafile');\">Export as .doc</button>";
        }
        $sppjb_stts = $data["sppjb_stts"]; 

        $tpl1 =
            '<style>
				
				
                table {
                    border-collapse: collapse;
                }
                table, td, th {
                    border: 1px solid black;
                    font-size:12px;
                }
				
                td{
                    padding:2px 10px;
                }
                body{
                    font-family: Arial;
                }
                p.spstyle_p, div {
                    font-size: 12px;
                }
                p.spstyle_p_small{
                    font-size: 10px;
                
                }
                .amiddle{
                    text-align: justify;
                    text-justify: inter-word;
                }
                </style>
                <body>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<!--<img src="https://ces.ciputragroup.com:73/webapps/Ciputra/public/app/main/images/{{logo_pt}}" width="200" height="50">-->
                <br/>
                <table style="border:none;font-family: Arial;">
                    <tr style="border:none;">
                        <td valign="top" style="border:none;" width="380" align="right"></td>
                        <td align="left" style="border:none;">
                            <div>Kepada Yth,</div>
                            <div>Bapak/Ibu<b>{{customer_name}}</b></div>
                            <div>{{customer_address}}</div>
                        </td>
                    </tr>
                </table><br/>
                <!--<p align="right" class="spstyle_p" style="width: 310px;">Kepada Yth, <br>
                    Bapak/Ibu <b>{{customer_name}}</b><br>
                    {{customer_address}}</p>-->
                <p align="left" class="spstyle_p">Jakarta, <b>' . $tgl_print_sp4 . '</b></p>
                <p class="spstyle_p">No. Ref : <b>' . $nomor_sp_teratas . '</b><br/></p><br/>
                <p align="center" class="spstyle_p"><b>Perilhal : Surat  Peringatan {{sp_surat_ke}} ({{sp_surat_ke_new}})</b></p><br/><br/>

                <p style="text-align: justify;class="spstyle_p">Dengan Hormat,
                <div class="amiddle">';
		
		$tpl111 =
            '<style>
				
				
                table {
                    border-collapse: collapse;
                }
                table, td, th {
                    border: 1px solid black;
                    font-size:12px;
                }
				
                td{
                    padding:2px 10px;
                }
                body{
                    font-family: Arial;
                }
                p.spstyle_p, div {
                    font-size: 12px;
                }
                p.spstyle_p_small{
                    font-size: 10px;
                
                }
                .amiddle{
                    text-align: justify;
                    text-justify: inter-word;
                }
                </style>
                <body>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<!--<img src="https://ces.ciputragroup.com:73/webapps/Ciputra/public/app/main/images/{{logo_pt}}" width="200" height="50">-->
                <br/>
                <table style="border:none;font-family: Arial;">
                    <tr style="border:none;">
                        <td valign="top" style="border:none;" width="380" align="right"></td>
                        <td align="left" style="border:none;">
                            <div>Kepada Yth,</div>
                            <div>Bapak/Ibu<b>{{customer_name}}</b></div>
                            <div>{{customer_address}}</div>
                        </td>
                    </tr>
                </table><br/>
                <!--<p align="right" class="spstyle_p" style="width: 310px;">Kepada Yth, <br>
                    Bapak/Ibu <b>{{customer_name}}</b><br>
                    {{customer_address}}</p>-->
                <p align="left" class="spstyle_p">Jakarta, <b>' . $tgl_print_sp4 . '</b></p>
                <p class="spstyle_p">No. Ref : <b>' . $nomor_sp_teratas . '</b><br/></p><br/>
                <p align="center" class="spstyle_p"><b>Perilhal : Pembatalan Perjanjian Pengikatan Jual Beli No. {{sppjb_no}} tanggal {{sppjb_date}} unit {{unit_number}} {{cluster_desc}} - Ciputra International atas nama {{customer_name}}</b></p><br/><br/>

                <p style="text-align: justify;class="spstyle_p">Dengan Hormat,
                <div class="amiddle">';
				
		$tpl1111 =
            '<style>
				
				
                table {
                    border-collapse: collapse;
                }
                table, td, th {
                    border: 1px solid black;
                    font-size:12px;
                }
				
                td{
                    padding:2px 10px;
                }
                body{
                    font-family: Arial;
                }
                p.spstyle_p, div {
                    font-size: 12px;
                }
                p.spstyle_p_small{
                    font-size: 10px;
                
                }
                .amiddle{
                    text-align: justify;
                    text-justify: inter-word;
                }
                </style>
                <body>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<!--<img src="https://ces.ciputragroup.com:73/webapps/Ciputra/public/app/main/images/{{logo_pt}}" width="200" height="50">-->
                <br/>
                <table style="border:none;font-family: Arial;">
                    <tr style="border:none;">
                        <td valign="top" style="border:none;" width="380" align="right"></td>
                        <td align="left" style="border:none;">
                            <div>Kepada Yth,</div>
                            <div>Bapak/Ibu<b>{{customer_name}}</b></div>
                            <div>{{customer_address}}</div>
                        </td>
                    </tr>
                </table><br/>
                <!--<p align="right" class="spstyle_p" style="width: 310px;">Kepada Yth, <br>
                    Bapak/Ibu <b>{{customer_name}}</b><br>
                    {{customer_address}}</p>-->
                <p align="left" class="spstyle_p">Jakarta, <b>' . $tgl_print_sp4 . '</b></p>
                <p class="spstyle_p">No. Ref : <b>' . $nomor_sp_teratas . '</b><br/></p><br/>
                <p align="center" class="spstyle_p"><b>Perilhal : Pembatalan Formulir Pesanan No. {{purchaseletter_no}} tanggal {{tanda_tangan}} unit {{unit_number}} {{cluster_desc}} - Ciputra International atas nama {{customer_name}}</b></p><br/><br/>

                <p style="text-align: justify;class="spstyle_p">Dengan Hormat,
                <div class="amiddle">';

        $tpl2 =
            '<br/>
            Merujuk kepada=<br/>
            <table style="border:none;font-family: Arial;">
                    <tr style="border:none;">
                        <td valign="top" style="border:none;" width="1" align="left">(i)</td>
                        <td align="justify" style="border:none;">
                            Formulir Pesanan No. {{purchaseletter_no}} tanggal {{tanda_tangan}} unit {{unit_number}} {{cluster_desc}} - Ciputra International atas nama {{customer_name}} (“Formulir Pesanan”), dan
                        </td>
                    </tr>
                    <tr>
                        <td valign="top" style="border:none;" width="1" align="left">(ii)</td>
                        <td align="justify" style="border:none;">
                            Surat Peringatan III Ref: ' . $data['sp3'] . ' tertanggal ' . $this->tgl_indo(date('Y-m-d', strtotime($data['sp3_date']))).', perihal Surat Peringatan III (Ketiga).
                        </td>

                    </tr>
                </table><br/>
                    Oleh karena wanprestasi Bapak/Ibu yaitu tidak melakukan pelunasan atas total tunggakan sampai dengan tenggat waktu yang ditentukan pada Surat Peringatan Ketiga, maka berdasarkan Pasal 9 Syarat-Syarat dan Ketentuan-Ketentuan Pesanan dalam Formulir Pesanan dengan ini kami membatalkan Formulir Pesanan Bapak/Ibu dan seluruh pembayaran yang telah dilakukan kepada kami tidak dapat dituntut atau ditarik kembali dan menjadi sah milik kami. Pembatalan Formulir Pesanan berlaku seketika sejak diterbitkannya surat pembatalan ini.<br/><br/>
                    Demikian pemberitahuan dari kami. Atas perhatian dan kerjasamanya kami ucapkan terima kasih.<br/><br/>
                        ';
						
		$tpl21 =
            '<br/>
            Merujuk kepada=<br/>
            <table style="border:none;font-family: Arial;">
                    <tr style="border:none;">
                        <td valign="top" style="border:none;" width="1" align="left">(i)</td>
                        <td align="justify" style="border:none;">
                            (i)	Perjanjian Pengikatan Jual Beli No. {{sppjb_no}} tanggal {{sppjb_date}} unit {{unit_number}} {{cluster_desc}} - Ciputra International atas nama {{customer_name}}, dan
                        </td>
                    </tr>
                    <tr>
                        <td valign="top" style="border:none;" width="1" align="left">(ii)</td>
                        <td align="justify" style="border:none;">
                            Surat Peringatan III Ref: ' . $data['sp3'] . ' tertanggal ' . $this->tgl_indo(date('Y-m-d', strtotime($data['sp3_date']))).', perihal Surat Peringatan III (Ketiga).
                        </td>

                    </tr>
                </table><br/>
                    Oleh karena wanprestasi Bapak/Ibu yaitu tidak melakukan pelunasan atas total tunggakan sampai dengan tenggat waktu yang ditentukan pada Surat Peringatan Ketiga, maka berdasarkan Pasal 3 ayat 10 dan 11 serta Pasal 9 ayat 3 Perjanjian Pengikatan Jual Beli dengan ini kami memutuskan Perjanjian Pengikatan Jual Beli Bapak/Ibu  secara sepihak dan seluruh pembayaran yang telah dilakukan kepada kami tidak dapat dikembalikan dan menjadi sah milik kami. Pembatalan Perjanjian Pengikatan Jual Beli berlaku seketika sejak diterbitkannya surat pembatalan ini.<br/><br/>
                    Demikian pemberitahuan dari kami. Atas perhatian dan kerjasamanya kami ucapkan terima kasih.<br/><br/>
                        ';

        $tpl3 =
            '<br/>
            Sehubungan dengan telah ditandatanganinya Formulir Pesanan No. {{purchaseletter_no}} tanggal {{tanda_tangan}} unit {{unit_number}} tower {{cluster_desc}} – Ciputra International atas nama {{customer_name}} ( untuk selanjutnya disebut “ FP “ ) dan sampai dengan tanggal surat ini diterbitkan, Bapak/Ibu masih mempunyai tunggakan dengan rincian sebagai berikut :
            ';

        $tpl31 =
            '<br/>
            Sehubungan dengan telah ditandatanganinya  Perjanjian Pengikatan Jual Beli No. {{sppjb_no}} tanggal {{sppjb_date}} unit {{unit_number}} tower {{cluster_desc}} – Ciputra International atas nama {{customer_name}} ( untuk selanjutnya disebut “ FP “ ) dan sampai dengan tanggal surat ini diterbitkan, Bapak/Ibu masih mempunyai tunggakan dengan rincian sebagai berikut :
            ';        

        $tpl4 =
            'Sehubungan dengan Surat Peringatan I Ref: ' . $data['sp1'] . ' tanggal ' . $this->tgl_indo(date('Y-m-d', strtotime($data['sp1_date']))).' dan  Formulir Pesanan No. {{purchaseletter_no}} tanggal {{tanda_tangan}} unit {{unit_number}} tower {{cluster_desc}} – Ciputra International atas nama {{customer_name}} ( untuk selanjutnya disebut “ FP “ ) dan sampai dengan tanggal surat ini diterbitkan, Bapak/Ibu masih mempunyai tunggakan dengan rincian sebagai berikut : <br/>';
			
		$tpl41 =
            'Sehubungan dengan Surat Peringatan I Ref: ' . $data['sp1'] . ' tanggal ' . $this->tgl_indo(date('Y-m-d', strtotime($data['sp1_date']))).' dan  Perjanjian Pengikatan Jual Beli  No. {{sppjb_no}} tanggal {{sppjb_date}} unit {{unit_number}} tower {{cluster_desc}} – Ciputra International atas nama {{customer_name}} ( untuk selanjutnya disebut “ PPJB“ ) dan sampai dengan tanggal surat ini diterbitkan, Bapak/Ibu masih mempunyai tunggakan dengan rincian sebagai berikut : <br/>';

        $tpl5 = 'Sehubungan dengan Surat Peringatan I Ref: ' . $data['sp1'] . ' tanggal ' . $this->tgl_indo(date('Y-m-d', strtotime($data['sp1_date']))).' dan  Surat Peringatan II Ref: ' . $data['sp2'] . ' tanggal ' . $this->tgl_indo(date('Y-m-d', strtotime($data['sp2_date']))).' , maka bersama ini kami ingin menyampaikan hal-hal  sebagai berikut :<br/>
            <table style="border:none;">
                    <tr style="border:none;">
                        <td valign="top" style="border:none;" width="1" align="left">1. </td>
                        <td align="justify" style="border:none;">
                        Bahwa sampai dengan saat ini Bapak/Ibu {{customer_name}} selaku sebagai pembeli dari Unit {{cluster_desc}} No Unit {{unit_number}} berdasarkan Formulir Pesanan No. {{purchaseletter_no}} tanggal {{tanda_tangan}}(selanjutnya disebut “FP”), yang telah ditandatangani oleh Bapak/Ibu {{customer_name}} dengan PT Ciputra Puri Trisula (selanjutnya disebut “CPT”), belum melakukan kewajiban penyelesaian pembayaran cicilan harga jual dari Unit Apartemen sejumlah ' . number_format($data['total_remaining']) . ',- dengan perincian sebagai berikut :
                        </td>
                    </tr>
                </table>       
                        ';
		
		$tpl51 = 'Sehubungan dengan Surat Peringatan I Ref: ' . $data['sp1'] . ' tanggal ' . $this->tgl_indo(date('Y-m-d', strtotime($data['sp1_date']))).' dan  Surat Peringatan II Ref: ' . $data['sp2'] . ' tanggal ' . $this->tgl_indo(date('Y-m-d', strtotime($data['sp2_date']))).' , maka bersama ini kami ingin menyampaikan hal-hal  sebagai berikut :<br/>
            <table style="border:none;font-family: Arial;">
                    <tr style="border:none;">
                        <td valign="top" style="border:none;" width="1" align="left">1. </td>
                        <td align="justify" style="border:none;">
                        Bahwa sampai dengan saat ini Bapak/Ibu {{customer_name}} selaku sebagai pembeli dari Unit {{cluster_desc}} No Unit {{unit_number}} berdasarkan Perjanjian Pengikatan Jual Beli  No. {{sppjb_no}} tanggal {{sppjb_date}}(selanjutnya disebut PPJB), yang telah ditandatangani oleh Bapak/Ibu {{customer_name}} dengan PT Ciputra Puri Trisula (selanjutnya disebut “CPT”), belum melakukan kewajiban penyelesaian pembayaran cicilan harga jual dari Unit Apartemen sejumlah ' . number_format($data['total_remaining']) . ',- dengan perincian sebagai berikut :
                        </td>
                    </tr>
                </table>       
                        ';

        $tpl6 = '
			<table width=100% style="font-family: Arial;">
				<tbody align="center">
				<tr style="background-color: #e8e9ea;font-weight: bold;">
				<!--<td>Tagihan</td>
					<td>Termin</td>-->
					<td>Tanggal Jatuh Tempo</td>
					<td>Keterangan</td>
					<td>Jumlah (Rp)</td>
					<!--<td>Nomor SP - Tanggal SP</td>-->
					<td>Hari Denda</td>
					<td>Denda (Rp)</td>
                </tr> 
                {{{list_tagihan}}}
                </tbody></table>
                <br/>
				
			{{{pageBreak3}}}   
			<!--<b>Denda keterlambatan diatas akan berubah sampai dengan pembayaran dan dihitung sejak tanggal terhutang.</b>-->
                        <br/>';

        $tpl7 = '
        Berdasarkan hal tersebut diatas, maka kami mohon Bapak/Ibu untuk segera melakukan pelunasan atas total tunggakan , paling lambat tanggal ' . $tgl_print_tempo . ' ke rekening : <br/>

                <table style="border:none;font-family: Arial;">
                  <tr style="border:none;">
                    <td style="border:none;">&nbsp;&nbsp;&nbsp;</td>
                    <td style="border:none;">&nbsp;&nbsp;<b>Nama Penerima</b></td>
                    <td style="border:none;">: <b>{{customer_name}}</b></td>
                  </tr>
                  <tr style="border:none;">
                    <td style="border:none;">&nbsp;&nbsp;&nbsp;</td>
                    <td style="border:none;">&nbsp;&nbsp;<b>No Rekening</b></td>
                    <td style="border:none;">: <b>{{va_international}}</b></td>
                  </tr>
                  <tr style="border:none;">
                    <td style="border:none;">&nbsp;&nbsp;&nbsp;</td>
                    <td style="border:none;">&nbsp;&nbsp;<b>Bank</b></td>
                    <td style="border:none;">: <b>{{bank_international}}</b></td>
                  </tr>
                </table><br/>
                Apabila Bapak/Ibu telah melakukan pembayaran sejumlah total  tunggakan tersebut di atas, maka kami mohon bantuan Bapak/Ibu untuk menginformasikan pembayaran tersebut kepada kami dengan mengirimkan bukti transfer bank melalui email fellicia.halim@ciputra.com<br/>
                Demikian pemberitahuan dari kami. Atas perhatian dan kerjasamanya kami ucapkan terima kasih.';
		
		$tpl71 = '<table style="border:none;font-family: Arial;">
                    <tr style="border:none;">
                        <td valign="top" style="border:none;" width="1" align="left">2. </td>
                        <td align="justify" style="border:none;">
						Berdasarkan ketentuan dari nomor 1 diatas, dan sesuai dengan ketentuan yang tercantum didalam PPJB sekiranya telah cukup bagi kami untuk bahwa Bapak / Ibu telah dengan sengaja melakukan wanprestasi / cidera janji dalam memenuhi persyaratan dan kewajiban yang terdapat didalam PPJB. Oleh karenanya kewajiban Bapak / Ibu untuk melakukan melakukan pembayaran cicilan / tunggakan sudah jatuh tempo dan kami meminta kepada Bapak / Ibu untuk dapat melakukan pembayaran atas kewajiban tersebut seketika dan sekaligus paling lambat pada tanggal ' . $tgl_print_tempo . ' <br/>
						</td>
                    </tr>
					<tr style="border:none;">
						<td style="border:none;">&nbsp;&nbsp;&nbsp;</td>
						<td style="border:none;">&nbsp;&nbsp;<b>Nama Penerima</b></td>
						<td style="border:none;">: <b>{{customer_name}}</b></td>
					</tr>
					<tr style="border:none;">
						<td style="border:none;">&nbsp;&nbsp;&nbsp;</td>
						<td style="border:none;">&nbsp;&nbsp;<b>No Rekening</b></td>
						<td style="border:none;">: <b>{{va_international}}</b></td>
					</tr>
					<tr style="border:none;">
						<td style="border:none;">&nbsp;&nbsp;&nbsp;</td>
						<td style="border:none;">&nbsp;&nbsp;<b>Bank</b></td>
						<td style="border:none;">: <b>{{bank_international}}</b></td>
					</tr>
					<tr style="border:none;">
                        <td valign="top" style="border:none;" width="1" align="left">3. </td>
                        <td align="justify" style="border:none;">
						Apabila Bapak/Ibu telah melakukan pembayaran/transfer, mohon Bapak/Ibu melakukan konfirmasi kepada Fellicia Halim di nomor telepon 021 - 21500101 atau melalui email fellicia.halim@ciputra.com, disertai dengan lampiran bukti pembayaran/transfer. <br/>
						</td>
                    </tr>
					<tr style="border:none;">
                        <td valign="top" style="border:none;" width="1" align="left">4. </td>
                        <td align="justify" style="border:none;">
						Dengan lewatnya waktu yang ditetapkan dalam ketentuan nomor 2 diatas, dan Bapak / Ibu tidak melakukan pembayaran atas cicilan harga jual dari Unit Office sebagaimana disebutkan dalam Ketentuan nomor 1 diatas, maka sesuai dengan ketentuan Pasal 3 ayat 10 dan 11 serta Pasal 9 ayat 3 Perjanjian Pengikatan Jual Beli , kami berhak membatalkan Perjanjian Pengikatan Jual Beli tersebut dan dan seluruh pembayaran yang telah dilakukan oleh Bapak / Ibu kepada kami tidak dapat dituntut atau ditarik kembali (dikembalikan) karena sebab atau alasan apapun menjadi hak dari CPT sepenuhnya. <br/>
						</td>
                    </tr>
					</table><br/>
                Demikian Surat Peringatan ini kami sampaikan. Atas perhatian dan kerjasamanya yang baik kami ucapkan terima kasih.';
				
		$tpl711 = '<table style="border:none;font-family: Arial;">
                    <tr style="border:none;">
                        <td valign="top" style="border:none;" width="1" align="left">2. </td>
                        <td align="justify" style="border:none;">
						Berdasarkan ketentuan dari nomor 1 diatas, dan sesuai dengan ketentuan yang tercantum didalam PPJB sekiranya telah cukup bagi kami untuk bahwa Bapak / Ibu telah dengan sengaja melakukan wanprestasi / cidera janji dalam memenuhi persyaratan dan kewajiban yang terdapat didalam PPJB. Oleh karenanya kewajiban Bapak / Ibu untuk melakukan melakukan pembayaran cicilan / tunggakan sudah jatuh tempo dan kami meminta kepada Bapak / Ibu untuk dapat melakukan pembayaran atas kewajiban tersebut seketika dan sekaligus paling lambat pada tanggal ' . $tgl_print_tempo . ' <br/>
						</td>
					</table>';
				
		$tpl712 = '<table style="border:none;font-family: Arial;">
					<tr style="border:none;">
						<td style="border:none;">&nbsp;&nbsp;&nbsp;</td>
						<td style="border:none;">&nbsp;&nbsp;<b>Nama Penerima</b></td>
						<td style="border:none;">: <b>{{customer_name}}</b></td>
					</tr>
					<tr style="border:none;">
						<td style="border:none;">&nbsp;&nbsp;&nbsp;</td>
						<td style="border:none;">&nbsp;&nbsp;<b>No Rekening</b></td>
						<td style="border:none;">: <b>{{va_international}}</b></td>
					</tr>
					<tr style="border:none;">
						<td style="border:none;">&nbsp;&nbsp;&nbsp;</td>
						<td style="border:none;">&nbsp;&nbsp;<b>Bank</b></td>
						<td style="border:none;">: <b>{{bank_international}}</b></td>
					</tr>
					</table>';
					
		$tpl713 = '<table style="border:none;font-family: Arial;">
                    <tr style="border:none;">
                        <td valign="top" style="border:none;" width="1" align="left">3. </td>
                        <td align="justify" style="border:none;">
						Apabila Bapak/Ibu telah melakukan pembayaran/transfer, mohon Bapak/Ibu melakukan konfirmasi kepada Fellicia Halim di nomor telepon 021 - 21500101 atau melalui email fellicia.halim@ciputra.com, disertai dengan lampiran bukti pembayaran/transfer. <br/>
						</td>
                    </tr>
					<tr style="border:none;">
                        <td valign="top" style="border:none;" width="1" align="left">4. </td>
                        <td align="justify" style="border:none;">
						Dengan lewatnya waktu yang ditetapkan dalam ketentuan nomor 2 diatas, dan Bapak / Ibu tidak melakukan pembayaran atas cicilan harga jual dari Unit Office sebagaimana disebutkan dalam Ketentuan nomor 1 diatas, maka sesuai dengan ketentuan Pasal 3 ayat 10 dan 11 serta Pasal 9 ayat 3 Perjanjian Pengikatan Jual Beli , kami berhak membatalkan Perjanjian Pengikatan Jual Beli tersebut dan dan seluruh pembayaran yang telah dilakukan oleh Bapak / Ibu kepada kami tidak dapat dituntut atau ditarik kembali (dikembalikan) karena sebab atau alasan apapun menjadi hak dari CPT sepenuhnya. <br/>
						</td>
                    </tr>
					</table><br/>
                Demikian Surat Peringatan ini kami sampaikan. Atas perhatian dan kerjasamanya yang baik kami ucapkan terima kasih.';
				
		$tpl72 = '<table style="border:none;font-family: Arial;">
                    <tr style="border:none;">
                        <td valign="top" style="border:none;" width="1" align="left">2. </td>
                        <td align="justify" style="border:none;">
						Berdasarkan ketentuan dari nomor 1 diatas, dan sesuai dengan ketentuan yang tercantum didalam FP sekiranya telah cukup bagi kami untuk bahwa Bapak / Ibu telah dengan sengaja melakukan wanprestasi / cidera janji dalam memenuhi persyaratan dan kewajiban yang terdapat didalam FP. Oleh karenanya kewajiban Bapak / Ibu untuk melakukan melakukan pembayaran cicilan / tunggakan sudah jatuh tempo dan kami meminta kepada Bapak / Ibu untuk dapat melakukan pembayaran atas kewajiban tersebut seketika dan sekaligus paling lambat pada tanggal ' . $tgl_print_tempo . ' <br/>
						</td>
                    </tr>
					<tr style="border:none;">
						<td style="border:none;">&nbsp;&nbsp;&nbsp;</td>
						<td style="border:none;">&nbsp;&nbsp;<b>Nama Penerima</b></td>
						<td style="border:none;">: <b>{{customer_name}}</b></td>
					</tr>
					<tr style="border:none;">
						<td style="border:none;">&nbsp;&nbsp;&nbsp;</td>
						<td style="border:none;">&nbsp;&nbsp;<b>No Rekening</b></td>
						<td style="border:none;">: <b>{{va_international}}</b></td>
					</tr>
					<tr style="border:none;">
						<td style="border:none;">&nbsp;&nbsp;&nbsp;</td>
						<td style="border:none;">&nbsp;&nbsp;<b>Bank</b></td>
						<td style="border:none;">: <b>{{bank_international}}</b></td>
					</tr>
					<tr style="border:none;">
                        <td valign="top" style="border:none;" width="1" align="left">3. </td>
                        <td align="justify" style="border:none;">
						Apabila Bapak/Ibu telah melakukan pembayaran/transfer, mohon Bapak/Ibu melakukan konfirmasi kepada Dedy Novianto di nomor telepon 021 - 21500101 atau melalui email dedy.novianto@ciputra.com, disertai dengan lampiran bukti pembayaran/transferr. <br/>
						</td>
                    </tr>
					<tr style="border:none;">
                        <td valign="top" style="border:none;" width="1" align="left">4. </td>
                        <td align="justify" style="border:none;">
						Dengan lewatnya waktu yang ditetapkan dalam ketentuan nomor 2 diatas, dan Bapak / Ibu tidak melakukan pembayaran atas cicilan harga jual dari Unit Office sebagaimana disebutkan dalam Ketentuan nomor 1 diatas, maka sesuai dengan ketentuan Pasal 5 huruf “b” dan Pasal 9 Formulir Pesanan bagian Syarat-Syarat dan Ketentuan-Ketentuan Pesanan, kami berhak membatalkan Formulir Pesanan tersebut dan dan seluruh pembayaran yang telah dilakukan oleh Bapak / Ibu kepada kami tidak dapat dituntut atau ditarik kembali (dikembalikan) karena sebab atau alasan apapun menjadi hak dari CPT sepenuhnya. <br/>
						</td>
                    </tr>
					</table><br/>
                Demikian Surat Peringatan ini kami sampaikan. Atas perhatian dan kerjasamanya yang baik kami ucapkan terima kasih.';
				
		$tpl721 = '<table style="border:none;font-family: Arial;">
                    <tr style="border:none;">
                        <td valign="top" style="border:none;" width="1" align="left">2. </td>
                        <td align="justify" style="border:none;">
						Berdasarkan ketentuan dari nomor 1 diatas, dan sesuai dengan ketentuan yang tercantum didalam FP sekiranya telah cukup bagi kami untuk bahwa Bapak / Ibu telah dengan sengaja melakukan wanprestasi / cidera janji dalam memenuhi persyaratan dan kewajiban yang terdapat didalam FP. Oleh karenanya kewajiban Bapak / Ibu untuk melakukan melakukan pembayaran cicilan / tunggakan sudah jatuh tempo dan kami meminta kepada Bapak / Ibu untuk dapat melakukan pembayaran atas kewajiban tersebut seketika dan sekaligus paling lambat pada tanggal ' . $tgl_print_tempo . ' <br/>
						</td>
                    </tr>
					</table>';
				
		$tpl722 = '<table style="border:none;font-family: Arial;">
					<tr style="border:none;">
						<td style="border:none;">&nbsp;&nbsp;&nbsp;</td>
						<td style="border:none;">&nbsp;&nbsp;<b>Nama Penerima</b></td>
						<td style="border:none;">: <b>{{customer_name}}</b></td>
					</tr>
					<tr style="border:none;">
						<td style="border:none;">&nbsp;&nbsp;&nbsp;</td>
						<td style="border:none;">&nbsp;&nbsp;<b>No Rekening</b></td>
						<td style="border:none;">: <b>{{va_international}}</b></td>
					</tr>
					<tr style="border:none;">
						<td style="border:none;">&nbsp;&nbsp;&nbsp;</td>
						<td style="border:none;">&nbsp;&nbsp;<b>Bank</b></td>
						<td style="border:none;">: <b>{{bank_international}}</b></td>
					</tr>
					</table>';
				
		$tpl723 = '<table style="border:none;font-family: Arial;">
                    <tr style="border:none;">
                        <td valign="top" style="border:none;" width="1" align="left">3. </td>
                        <td align="justify" style="border:none;">
						Apabila Bapak/Ibu telah melakukan pembayaran/transfer, mohon Bapak/Ibu melakukan konfirmasi kepada Dedy Novianto di nomor telepon 021 - 21500101 atau melalui email dedy.novianto@ciputra.com, disertai dengan lampiran bukti pembayaran/transferr. <br/>
						</td>
                    </tr>
					<tr style="border:none;">
                        <td valign="top" style="border:none;" width="1" align="left">4. </td>
                        <td align="justify" style="border:none;">
						Dengan lewatnya waktu yang ditetapkan dalam ketentuan nomor 2 diatas, dan Bapak / Ibu tidak melakukan pembayaran atas cicilan harga jual dari Unit Office sebagaimana disebutkan dalam Ketentuan nomor 1 diatas, maka sesuai dengan ketentuan Pasal 5 huruf “b” dan Pasal 9 Formulir Pesanan bagian Syarat-Syarat dan Ketentuan-Ketentuan Pesanan, kami berhak membatalkan Formulir Pesanan tersebut dan dan seluruh pembayaran yang telah dilakukan oleh Bapak / Ibu kepada kami tidak dapat dituntut atau ditarik kembali (dikembalikan) karena sebab atau alasan apapun menjadi hak dari CPT sepenuhnya. <br/>
						</td>
                    </tr>
					</table><br/>
                Demikian Surat Peringatan ini kami sampaikan. Atas perhatian dan kerjasamanya yang baik kami ucapkan terima kasih.';

        $tpl8 = '<table style="border:none;font-family: Arial;">
                    <tr style="border:none;">
                        <td valign="top" style="border:none;" width="1" align="left">3. </td>
                        <td align="justify" style="border:none;">
                            Bahwa, pada poin nomor 10 dalam syarat dan ketentuan Keterlambatan Pembayaran dalam Formulir Pesanan Satuan Rumah Susun Tower {{cluster}} @ Citra Landmark Southeast Jakarta disebutkan sebagai berikut:<br/>
                            10. Apabila PEMESAN lalai melakukan pembayaran angsuran (baik kurang bayar atau terlambat) berdasarkan Formulir Pesanan ini sebanyak 3 (tiga) kali berturut-turut, terhitung sejak tanggal permulaan kelalaian terjadi, PENERIMA PESANAN berhak untuk membatalkan Formulir Pesanan ini dan seluruh pembayaran yang telah dilakukan PEMESANAN tidak dapat dituntut atau ditarik kembali dan menjadi sah milik PENERIMA PESANAN.”
                        </td>
                    </tr>
                    <tr>
                        <td valign="top" style="border:none;" width="1" align="left">4. </td>
                        <td align="justify" style="border:none;">
                            Bahwa, berdasarkan hal-hal tersebut diatas, maka Kami/PT CCT mohon Bapak/Ibu segera melakukan pelunasan atas tunggakan di atas, paling lambat 14 (empat belas) hari kalender setelah tanggal yang tertera di surat ini atau paling lambat tanggal ' . $tgl_print_max . '  ke rekening sebagai berikut:
                        </td>

                    </tr>
                </table>
                <table style="border:none;font-family: Arial;">
                  <tr style="border:none;">
                    <td style="border:none;">&nbsp;&nbsp;&nbsp;</td>
                    <td style="border:none;">&nbsp;&nbsp;Nama Penerima</td>
                    <td style="border:none;">: {{pt_name}}</b></td>
                  </tr>
                  <tr style="border:none;">
                    <td style="border:none;">&nbsp;&nbsp;&nbsp;</td>
                    <td style="border:none;">&nbsp;&nbsp;No Rekening</td>
                    <td style="border:none;">: {{pt_rekening}} (IDR)</td>
                  </tr>
                  <tr style="border:none;">
                    <td style="border:none;">&nbsp;&nbsp;&nbsp;</td>
                    <td style="border:none;">&nbsp;&nbsp;Bank</td>
                    <td style="border:none;">: {{pt_bank_name}}</td>
                  </tr>
                </table><br/>
                Apabila Bapak/Ibu telah melakukan pembayaran atas total tunggakan di atas mohon mengabaikan Surat Peringatan ini dan menginformasikan pembayaran tersebut kepada kami dengan mengirimkan bukti transfer bank melalui e-mail: collection.citralandmark@ciputra.co.id<br/>
                Demikian Surat Peringatan-{{sp_surat_ke}} ini disampaikan. Atas perhatian dan kerjasamanya Kami ucapkan terima kasih.';

        $tpl9 = '<style>
                
                
                table {
                    border-collapse: collapse;
                }
                table, td, th {
                    border: 1px solid black;
                    font-size:12px;
                }
                
                td{
                    padding:2px 10px;
                }
                body{
                    font-family: Arial;
                }
                p.spstyle_p, div {
                    font-size: 12px;
                }
                p.spstyle_p_small{
                    font-size: 10px;
                
                }
                .amiddle{
                    text-align: justify;
                    text-justify: inter-word;
                }
                </style>
                <body>
                <br/>
                <br/>
                <br/>
                <!--<img src="https://ces.ciputragroup.com:73/webapps/Ciputra/public/app/main/images/{{logo_pt}}" width="200" height="50">-->
                <br/>
                <table style="border:none;font-family: Arial;">
                    <tr style="border:none;">
                        <td valign="top" style="border:none;" width="380" align="right"></td>
                        <td align="left" style="border:none;">
                            <div>Kepada Yth,</div>
                            <div>Bapak/Ibu<b>{{customer_name}}</b></div>
                            <div>{{customer_address}}</div>
                        </td>
                    </tr>
                </table><br/>
                <!--<p align="right" class="spstyle_p" style="width: 310px;">Kepada Yth, <br>
                    Bapak/Ibu <b>{{customer_name}}</b><br>
                    {{customer_address}}</p>-->
                <p align="left" class="spstyle_p">Jakarta, <b>' . $tgl_print . '</b></p>
                <p class="spstyle_p">No. Ref : <b>' . $nomor_sp_teratas . '</b><br/></p><br/>
                <p align="center" class="spstyle_p"><b>Perilhal : Pembatalan Formulir Pesanan No. {{purchaseletter_no}} tanggal {{tanda_tangan}} unit {{unit_number}} {{cluster_desc}} -Ciputra International atas nama PT. VIGOUR INDO PROPERTI</b></p><br/><br/>

                <p style="text-align: justify;class="spstyle_p">Dengan Hormat,
                <div class="amiddle">';

        $tpl10 = '<table style="border:none;font-family: Arial;">
                    <tr style="border:none;">
                        <td valign="top" style="border:none;" width="1" align="left">2. </td>
                        <td align="justify" style="border:none;">
                            Berdasarkan ketentuan dari nomor 1 diatas, dan sesuai dengan ketentuan yang tercantum didalam FP sekiranya telah cukup bagi kami untuk bahwa Bapak / Ibu telah dengan sengaja melakukan wanprestasi / cidera janji dalam memenuhi persyaratan dan kewajiban yang terdapat didalam FP. Oleh karenanya kewajiban Bapak / Ibu untuk melakukan melakukan pembayaran cicilan / tunggakan sudah jatuh tempo dan kami meminta kepada Bapak / Ibu untuk dapat melakukan pembayaran atas kewajiban tersebut seketika dan sekaligus paling lambat pada tanggal 13 September 2021.
                        </td>
                    </tr>
                    </table>
                <table style="border:none;font-family: Arial;">
                  <tr style="border:none;">
                    <td style="border:none;">&nbsp;&nbsp;&nbsp;</td>
                    <td style="border:none;">&nbsp;&nbsp;<b>Nama Penerima</b></td>
                    <td style="border:none;">: <b>{{customer_name}}</b></td>
                  </tr>
                  <tr style="border:none;">
                    <td style="border:none;">&nbsp;&nbsp;&nbsp;</td>
                    <td style="border:none;">&nbsp;&nbsp;<b>No Rekening</b></td>
                    <td style="border:none;">: <b>{{va_mandiri}}</b></td>
                  </tr>
                  <tr style="border:none;">
                    <td style="border:none;">&nbsp;&nbsp;&nbsp;</td>
                    <td style="border:none;">&nbsp;&nbsp;<b>Bank</b></td>
                    <td style="border:none;">: <b>Bank Mandiri Cabang Plaza Mandiri</b></td>
                  </tr>
                </table>
                <br/>
                <table style="border:none;font-family: Arial;">
                    <tr style="border:none;">
                        <td valign="top" style="border:none;" width="1" align="left">3. </td>
                        <td align="justify" style="border:none;">
                            Apabila Bapak/Ibu telah melakukan pembayaran/transfer , mohon Bapak/Ibu melakukan konfirmasi kepada Fellicia Halim di nomor telepon 021-21500101 atau melalui email fellicia.halim@ciputra.com, disertai dengan  lampiran bukti pembayaran/transfer.
                        </td>
                    </tr>
                    <tr style="border:none;">
                        <td valign="top" style="border:none;" width="1" align="left">4. </td>
                        <td align="justify" style="border:none;">
                           Dengan lewatnya waktu yang ditetapkan dalam ketentuan nomor 2 diatas, dan Bapak / Ibu tidak melakukan pembayaran atas cicilan harga jual dari Unit Office sebagaimana disebutkan dalam Ketentuan nomor 1 diatas, maka sesuai dengan ketentuan Pasal 5 huruf “b” dan Pasal 9 Formulir Pesanan bagian Syarat-Syarat dan Ketentuan-Ketentuan Pesanan, kami berhak membatalkan Formulir Pesanan tersebut dan dan seluruh pembayaran yang telah dilakukan oleh Bapak / Ibu kepada kami tidak dapat dituntut atau ditarik kembali (dikembalikan) karena sebab atau alasan apapun menjadi hak dari CPT sepenuhnya.
                        </td>
                    </tr>
                </table>
                ' . $page_break . '
                <br/>
                Demikian pemberitahuan dari kami. Atas perhatian dan kerjasamanya kami ucapkan terima kasih.';

        $tpl11 = '</div>
                <!--<br/>--><br/>
                <p class="spstyle_p">
                Hormat Kami,</br>
				{{pt_name}}</br>
                <!--<img src="https://ces.ciputragroup.com:73/webapps/Ciputra/public/app/main/images/ttd_romy_citralandmark.png" width="120" height="60">-->
                <br/><br/><br/><br/><br/>
                <b><u>Cindy Hadiwijaya</u></b><br/>
				<!-- --------------------------------------<br/> -->
				<b>Finance Controller</b>
				<!--{{salesman_name}} (Sales)<br/>-->
                </p>

                <!--<p class="spstyle_p_small"><b>Note</b> : <i>Apabila pada saat surat ini diterima Bapak/Ibu telah melakukan transfer ke VA BCA, mohon untuk segera menghubungi kami, sehingga kami dapat melakukan pengecekan lebih lanjut.</i></p>-->
                </body>
                ';
        $tpl12 = '</div>
                <!--<br/>--><br/>
                <p class="spstyle_p" align="left">
                Hormat Kami,</br>
                {{pt_name}}</br>
                <!--<img src="https://ces.ciputragroup.com:73/webapps/Ciputra/public/app/main/images/ttd_romy_citralandmark.png" width="120" height="60">
                <img src="https://ces.ciputragroup.com:73/webapps/Ciputra/public/app/main/images/ttd_pak_ronny.jpeg" width="120" height="60">-->
                <br/>
                <b><u>Cindy Hadiwijaya</u></b>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <b><u>Agustono Effendy</u></b><br/>
                <!-- --------------------------------------<br/> -->
                Finance Controller
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;;&nbsp;&nbsp;
                Direktur
                <!--{{salesman_name}} (Sales)<br/>-->
                </p>

                <!--<p class="spstyle_p_small"><b>Note</b> : <i>Apabila pada saat surat ini diterima Bapak/Ibu telah melakukan transfer ke VA BCA, mohon untuk segera menghubungi kami, sehingga kami dapat melakukan pengecekan lebih lanjut.</i></p>-->
                </body>
                ';
        $tpl13 .= '</div>
                <!--<br/>--><br/>
                <p class="spstyle_p" align="left">
                Hormat Kami,</br>
                {{pt_name}}</br>
                </br>
                </br>
                </br>
                <!--<img src="https://ces.ciputragroup.com:73/webapps/Ciputra/public/app/main/images/ttd_romy_citralandmark.png" width="120" height="60">
                <img src="https://ces.ciputragroup.com:73/webapps/Ciputra/public/app/main/images/ttd_pak_ronny.jpeg" width="120" height="60">-->
                <br/>
                <b><u>ROMY LAWANDI</u></b>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <b><u>RONNY ARIANTO</u></b><br/>
                <!-- --------------------------------------<br/> -->
                Finance Controller
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Marketing Manager
                <!--{{salesman_name}} (Sales)<br/>-->
                </p>

                <!--<p class="spstyle_p_small"><b>Note</b> : <i>Apabila pada saat surat ini diterima Bapak/Ibu telah melakukan transfer ke VA BCA, mohon untuk segera menghubungi kami, sehingga kami dapat melakukan pengecekan lebih lanjut.</i></p>-->
                </body>
                ';

        if ($spke == 1 && $sppjb_stts == 0) {
            $tpl = $tpl1 . $tpl3 . $tpl6 . $tpl7 . $tpl11;
        } elseif ($spke == 1 && $sppjb_stts == 1) {
            $tpl = $tpl1 . $tpl31 . $tpl6 . $tpl7 . $tpl11;
        } elseif ($spke == 2 && $sppjb_stts == 0) {
            $tpl = $tpl1 . $tpl4 . $tpl6 . $tpl7 . $tpl11;
        } elseif ($spke == 2 && $sppjb_stts == 1) {
            $tpl = $tpl1 . $tpl41 . $tpl6 . $tpl7 . $tpl11;
        } elseif ($spke == 3 && $sppjb_stts == 0) {
            $tpl = $tpl1 . $tpl5 . $tpl6 . $tpl721 . $tpl722 . $tpl723 . $tpl11;
        } elseif ($spke == 3 && $sppjb_stts == 1) {
            $tpl = $tpl1 . $tpl51 . $tpl6 . $tpl711 . $tpl712 . $tpl713 . $tpl11;
        } elseif ($spke == 4 && $sppjb_stts == 0) {
            $tpl = $tpl1111 . $tpl2 . $tpl11;
        } elseif ($spke == 4 && $sppjb_stts == 1) {
            $tpl = $tpl111 . $tpl21 .  $tpl11;
        } else {
            $tpl = $tpl1 . $tpl3 . $tpl6 . $tpl7 . $tpl11;
        }

        return $word . '<div id="exportContent">' . $tpl . '</div>';
    }
}
