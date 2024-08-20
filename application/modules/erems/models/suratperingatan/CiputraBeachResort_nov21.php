<?php

/**
 * Description of Default
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Suratperingatan_CiputraBeachResort
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
                $denda = $row["denda_terlambatb"];
            }
            $ttldenda_terlambatb = $ttldenda_terlambatb + round($denda);
            $ttlremaining_balance = $ttlremaining_balance + $row["remaining_balance"] ;
			if($row["duedate"]<$duedate_awal){
				$table .= '<tr>
							<td>' . $this->tgl_indo(date('Y-m-d', strtotime($row["duedate"]))) . '</td>
							<td align="right">Rp. ' . number_format($row["remaining_balance"]) . '</td>
							<td align="right">Rp. ' . number_format($denda) . '</td>
							<td align="right">Rp. ' . number_format($row["remaining_balance"] + round($denda)) . '</td>
						</tr>';
				}
        }

        $table .= '<tr>
					<td>Total </td><td align="right">Rp. ' . number_format($ttlremaining_balance) . '</td>
					<td align="right">Rp. ' . number_format($ttldenda_terlambatb) . '</td>
					<td align="right">Rp. ' . number_format($ttlremaining_balance + $ttldenda_terlambatb) . '</td>
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
        // $tgl_print14 = $this->tgl_indo(date('Y-m-d', strtotime("14 day"))); //default 0 day
        // $tgl_print60 = $this->tgl_indo(date('Y-m-d', strtotime($data["duedate60"])));
        $nomor_sp_teratas = $data["nomor_sp_teratas"];
        $a = explode('/', $nomor_sp_teratas);
        $b = (int)($a[0]);
        if (substr($b, 0, 1) == "0") {
            $nomor_sp_teratas = $data["nomor_terakhir"];
        }
		$nomor_sp_teratas =  str_replace($a[2],$this->getRomawi($tgl_print_duedate),$nomor_sp_teratas);
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
                    font-family: "Comic Sans MS", "Comic Sans", cursive;
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
				<img src="https://ces.ciputragroup.com/webapps/Ciputra/public/app/main/images/{{logo_pt}}" width="200" height="50">
                <br/>
                <p align="right" class="spstyle_p">Jakarta, <b>' . $tgl_print . '</b></p>
                <p class="spstyle_p">No. Ref : <b>' . $nomor_sp_teratas . '</b><br/>
                    Hal : <b><u>Surat  Peringatan {{sp_surat_ke}}</b></u> </p> 

                <p class="spstyle_p" style="width: 310px;">Kepada Yth, <br>
                    Bapak/Ibu <b>{{customer_name}}</b><br>
                    {{customer_address}}</p>

                <p style="text-align: justify;class="spstyle_p">Dengan Hormat,<br>
                <div class="amiddle">';

        $tpl2 =
            'Perkenankan Kami <b>{{pt_name}}</b> (untuk selanjutnya disebut <b>"PT {{pt_initial}}"</b>) hendak menyampaikan hal-hal sebagai berikut:<br/>
            <table style="border:none;">
                    <tr style="border:none;">
                        <td valign="top" style="border:none;" width="1" align="left">1. </td>
                        <td align="justify" style="border:none;">
                            Bahwa sebelumnya Kami/PT {{pt_initial}} telah mengirimkan kepada Bapak/Ibu Surat-Surat Peringatan sebagai berikut:<br/>
                            1.1.&nbsp;Surat No. ' . $data['sp1'] . ' tertanggal ' . $this->tgl_indo($data['sp1_date']).' dengan perihal : Surat Peringatan-1;<br/>
                            1.2.&nbsp;Surat No. ' . $data['sp2'] . ' tertanggal ' . $this->tgl_indo($data['sp2_date']).' dengan perihal : Surat Peringatan-2;<br/>
                            1.3.&nbsp;Surat No. ' . $data['sp3'] . ' tertanggal ' . $this->tgl_indo($data['sp3_date']).' dengan perihal : Surat Peringatan-3;
                        </td>
                    </tr>
                    <tr>
                        <td valign="top" style="border:none;" width="1" align="left">2. </td>
                        <td align="justify" style="border:none;">
                            Bahwa, bersama ini Kami/PT {{pt_initial}} memberitahukan kepada Bapak/Ibu selaku pemesan Apartemen Unit {{unit_number}} Tower {{cluster}} @ Citra Landmark Southeast Jakarta (untuk selanjutnya disebut “Unit {{unit_number}} Tower {{cluster}}”), hingga surat ini diterbitkan masih terdapat tunggakan angsuran pembayaran atas Pemesanan Unit {{unit_number}} Tower {{cluster}} dimaksud sebesar Rp. ' . number_format($data['total_remaining']) . ' ({{total_remaining_text}} Rupiah).
                        </td>

                    </tr>
                    <tr>
                        <td valign="top" style="border:none;" width="1" align="left">3. </td>
                        <td align="justify" style="border:none;">
                            Bahwa, berdasarkan hal-hal tersebut di atas dan sebagaimana telah kami informasikan melalui surat-surat peringatan sebelumnya mengenai batas tanggal dan jumlah pembayaran tunggakan yang harus Bapak/Ibu bayarkan kepada Kami/PT {{pt_initial}} beserta konfirmasinya, dan oleh karena hingga saat ini Kami belum menerima pembayaran dan konfirmasi pembayaran atas tunggakan angsuran sebesar Rp. ' . number_format($data['total_remaining']) . ' ({{total_remaining_text}} Rupiah) dimaksud, <b>maka dengan berat hati Kami/PT {{pt_initial}} sampaikan bahwa tidak ada pilihan lain bagi Kami/ PT {{pt_initial}} saat ini selain melakukan pemutusan dan/atau pembatalan sepihak Formulir Pesanan Satuan Rumah Susun Tower {{cluster}} @ Citra Landmark Southeast Jakarta No. {{purchaseletter_no}} tertanggal {{tanda_tangan}} dan sejak saat ini dinyatakan berakhir/batal serta tidak berlaku lagi. Maka seluruh pembayaran yang telah Bapak/Ibu bayarkan kepada Kami/PT {{pt_initial}} tidak dapat dikembalikan, serta Unit {{unit_number}} Tower {{cluster}} dimaksud mutlak menjadi hak dan/atau milik Kami/PT {{pt_initial}} sepenuhnya, serta Kami/PT {{pt_initial}} dibebaskan dari upaya hukum perdata/pidana/upaya hukum apapun maupun upaya lainnya.</b>
                        </td>

                    </tr>
                </table><br/>
                    Bahwa, hal tersebut telah sesuai dengan Syarat-Syarat & Ketentuan-Ketentuan Pesanan poin nomor 10 pada Formulir Pesanan Satuan Rumah Susun Tower {{cluster}} @ Citra Landmark Southeast Jakarta No. {{purchaseletter_no}} tertanggal {{tanda_tangan}} dimaksud, disebutkan sebagai berikut:<br/>
                <table style="border:none;">
                    <tr style="border:none;">
                        <td valign="top" style="border:none;" width="1" align="left"></td>
                        <td align="justify" style="border:none;">
                            <i>10. Apabila PEMESAN lalai melakukan pembayaran angsuran (baik kurang bayar atau terlambat) berdasarkan Formulir Pesanan ini sebanyak 3 (tiga) kali berturut-turut, terhitung sejak tanggal permulaan kelalaian terjadi, PENERIMA PESANAN berhak untuk membatalkan Formulir Pesanan ini dan seluruh pembayaran yang telah dilakukan PEMESANAN tidak dapat dituntut atau ditarik kembali dan menjadi sah milik PENERIMA PESANAN.”</i>
                        </td>
                    </tr>
                           </table><br/>
                           Demikian Surat Pemberitahuan Pembatalan Pemesanan ini disampaikan. Atas perhatian dan kerjasamanya kami ucapkan terima kasih.  
                        ';

        $tpl3 =
            'Perkenankan Kami {{pt_name}} (untuk selanjutnya disebut "PT {{pt_initial}}") hendak menyampaikan hal-hal sebagai berikut:<br/>
            <table style="border:none;">
                    <tr style="border:none;">
                        <td valign="top" style="border:none;" width="1" align="left">1. </td>
                        <td align="justify" style="border:none;">
                            Bahwa, sebelumnya Bapak/Ibu telah melakukan pemesanan atas Unit {{unit_number}} di Apartemen Citra Landmark berdasarkan Formulir Pesanan Satuan Rumah Susun No. {{purchaseletter_no}} tertanggal {{tanda_tangan}} antara Bapak/Ibu {{customer_name}} dengan PT {{pt_initial}};
                        </td>
                    </tr>
                    <tr>
                        <td valign="top" style="border:none;" width="1" align="left">2. </td>
                        <td align="justify" style="border:none;">
                            Bahwa, bersama ini Kami/PT {{pt_initial}} memberitahukan kepada Bapak/Ibu selaku pemesan unit {{unit_number}}, {{cluster}}, bahwa berdasarkan catatan kami, Bapak/Ibu sampai dengan tanggal ' . $tgl_print . ' belum melaksanakan pembayaran angsuran yang telah jatuh tempo. Atas hal tersebut, total tunggakan yang harus diselesaikan menjadi sebagai berikut (dalam rupiah):
                        </td>

                    </tr>
                </table>       
                        ';

        $tpl4 =
            'Perkenankan Kami {{pt_name}} (untuk selanjutnya disebut "PT {{pt_initial}}") hendak menyampaikan hal-hal sebagai berikut:<br/>
            <table style="border:none;">
                    <tr style="border:none;">
                        <td valign="top" style="border:none;" width="1" align="left">1. </td>
                        <td align="justify" style="border:none;">
                            Bahwa sebelumnya Kami/PT {{pt_initial}} telah mengirimkan kepada Bapak/Ibu Surat No. ' . $data['sp1'] . ' tertanggal ' . $this->tgl_indo($data['sp1_date']).' dengan perihal : Surat Peringatan-1;
                        </td>
                    </tr>
                    <tr>
                        <td valign="top" style="border:none;" width="1" align="left">2. </td>
                        <td align="justify" style="border:none;">
                            Bahwa, bersama ini Kami/PT {{pt_initial}} memberitahukan kepada Bapak/Ibu selaku pemesan unit <b>{{unit_number}}, {{cluster}}</b>, hingga surat ini diterbitkan masih terdapat tunggakan angsuran pembayaran atas Unit ({{unit_number}}) di Apartemen Citra Landmark yang masih harus dibayarkan oleh Bapak/Ibu kepada Kami/PT {{pt_initial}}, sebagai berikut:
                        </td>

                    </tr>
                </table>       
                        ';

        $tpl5 = 'Perkenankan Kami {{pt_name}} (untuk selanjutnya disebut "PT {{pt_initial}}") hendak menyampaikan hal-hal sebagai berikut:<br/>
            <table style="border:none;">
                    <tr style="border:none;">
                        <td valign="top" style="border:none;" width="1" align="left">1. </td>
                        <td align="justify" style="border:none;">
                            Bahwa sebelumnya Kami/PT {{pt_initial}} telah mengirimkan kepada Bapak/Ibu Surat-Surat Peringatan sebagai berikut:<br/>
                            1.1.&nbsp;Surat No. ' . $data['sp1'] . ' tertanggal ' . $this->tgl_indo($data['sp1_date']).' dengan perihal : Surat Peringatan-1;<br/>
                            1.2.&nbsp;Surat No. ' . $data['sp2'] . ' tertanggal ' . $this->tgl_indo($data['sp2_date']).' dengan perihal : Surat Peringatan-2;
                        </td>
                    </tr>
                    <tr>
                        <td valign="top" style="border:none;" width="1" align="left">2. </td>
                        <td align="justify" style="border:none;">
                            Bahwa, bersama ini Kami/PT {{pt_initial}} memberitahukan kepada Bapak/Ibu selaku pemesan unit <b>{{unit_number}}, {{cluster}}</b>, hingga surat ini diterbitkan masih terdapat tunggakan angsuran pembayaran atas Unit ({{unit_number}}) di Apartemen Citra Landmark yang masih harus dibayarkan oleh Bapak/Ibu kepada Kami/PT {{pt_initial}}, sebagai berikut:
                        </td>

                    </tr>
                </table>       
                        ';

        $tpl6 = '
			<table width=100%>
				<tbody align="center">
				<tr style="background-color: #e8e9ea;font-weight: bold;">
				<!--<td>Tagihan</td>
					<td>Termin</td>-->
					<td>Tunggakan Bulan</td>
					<td>Cicilan Pokok</td>
					<!--<td>Keterlambatan (hari) </td>
					<td>Nomor SP - Tanggal SP</td>-->
					<td>Denda Keterlambatan <br>( s/d ' . $tgl_print . ' )</td>
					<td>Total Dibayar <br>( s/d ' . $tgl_print . ' )</td>
                </tr> 
                {{{list_tagihan}}}
                </tbody></table>
                <br/>
				
			{{{pageBreak3}}}   
			<b>Denda keterlambatan diatas akan berubah sampai dengan pembayaran dan dihitung sejak tanggal terhutang.</b>
                        <br/>';

        $tpl7 = '<table style="border:none;">
                    <tr style="border:none;">
                        <td valign="top" style="border:none;" width="1" align="left">3. </td>
                        <td align="justify" style="border:none;">
                            Bahwa, berdasarkan hal-hal tersebut diatas, maka Kami/PT {{pt_initial}} mohon kepada Bapak/Ibu agar segera melakukan pelunasan atas tunggakan di atas, paling lambat 30 (tiga puluh) hari kalender setelah tanggal yang tertera di surat ini atau paling lambat tanggal {{max_date_w}} ke rekening berikut:
                        </td>
                    </tr>
                </table>
                <table style="border:none;">
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
                Demikian Surat Peringatan-1 ini disampaikan. Atas perhatian dan kerjasamanya Kami ucapkan terima kasih.';

        $tpl8 = '<table style="border:none;">
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
                            Bahwa, berdasarkan hal-hal tersebut diatas, maka Kami/PT {{pt_initial}} mohon Bapak/Ibu segera melakukan pelunasan atas tunggakan di atas, paling lambat 14 (empat belas) hari kalender setelah tanggal yang tertera di surat ini atau paling lambat tanggal ' . $tgl_print_max . '  ke rekening sebagai berikut:
                        </td>

                    </tr>
                </table>
                <table style="border:none;">
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
                    font-family: "Comic Sans MS", "Comic Sans", cursive;
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
                <!--<img src="https://ces.ciputragroup.com/webapps/Ciputra/public/app/main/images/{{logo_pt}}" width="200" height="50">-->
                <br/>
                <p align="right" class="spstyle_p">Jakarta, <b>' . $tgl_print_sp4 . '</b></p>
                <!--<p class="spstyle_p">No. Ref : <b>' . $nomor_sp_teratas . '</b><br/>
                    Hal : <b><u>Surat  Peringatan {{sp_surat_ke}}</b></u> </p>-->

                <p class="spstyle_p" style="width: 310px;">Kepada Yth, <br>
                    Bapak/Ibu <b>{{customer_name}}</b><br>
                    {{customer_address}}</p><br/>
                Perihal : <b>Surat Pemberitahuan Pembatalan Pemesanan Unit {{unit_number}} Tower {{cluster}}.</b><br/>

                <p style="text-align: justify;class="spstyle_p">Dengan Hormat,<br>
                <div class="amiddle">';

        $tpl10 = '<table style="border:none;">
                    <tr style="border:none;">
                        <td valign="top" style="border:none;" width="1" align="left">3. </td>
                        <td align="justify" style="border:none;">
                            Bahwa, pada poin nomor 10 dalam syarat dan ketentuan Keterlambatan Pembayaran dalam Formulir Pesanan Satuan Rumah Susun Tower {{cluster}} @ Citra Landmark Southeast Jakarta disebutkan sebagai berikut:<br/>
                            <i>10. Apabila PEMESAN lalai melakukan pembayaran angsuran (baik kurang bayar atau terlambat) berdasarkan Formulir Pesanan ini sebanyak 3 (tiga) kali berturut-turut, terhitung sejak tanggal permulaan kelalaian terjadi, PENERIMA PESANAN berhak untuk membatalkan Formulir Pesanan ini dan seluruh pembayaran yang telah dilakukan PEMESANAN tidak dapat dituntut atau ditarik kembali dan menjadi sah milik PENERIMA PESANAN.”</i>
                        </td>
                    </tr>
                    <tr>
                        <td valign="top" style="border:none;" width="1" align="left">4. </td>
                        <td align="justify" style="border:none;">
                            Bahwa, berdasarkan hal-hal tersebut diatas, maka Kami/PT {{pt_initial}} mohon Bapak/Ibu segera melakukan pelunasan atas tunggakan di atas, paling lambat 14 (empat belas) hari kalender setelah tanggal yang tertera di surat ini atau paling lambat tanggal ' . $tgl_print_max . '  ke rekening sebagai berikut:
                        </td>

                    </tr>
                </table>
                <table style="border:none;">  
                  <tr style="border:none;">
                    <td style="border:none;">&nbsp;&nbsp;&nbsp;</td>
                    <td style="border:none;">&nbsp;&nbsp;&nbsp;Nama Penerima</td>
                    <td style="border:none;">: {{pt_name}}</b></td>
                  </tr>
                  <tr style="border:none;">
                    <td style="border:none;">&nbsp;&nbsp;&nbsp;</td>
                    <td style="border:none;">&nbsp;&nbsp;&nbsp;No Rekening</td>
                    <td style="border:none;">: {{pt_rekening}} (IDR)</td>
                  </tr>
                  <tr style="border:none;">
                    <td style="border:none;">&nbsp;&nbsp;&nbsp;</td>
                    <td style="border:none;">&nbsp;&nbsp;&nbsp;Bank</td>
                    <td style="border:none;">: {{pt_bank_name}}</td>
                  </tr>
                </table><br/>
                <table style="border:none;">
                    <tr style="border:none;">
                        <td valign="top" style="border:none;" width="1" align="left">5. </td>
                        <td align="justify" style="border:none;">
                           Bahwa, apabila selambat-lambatnya pada tanggal {{max_date_w}} Bapak/Ibu belum juga melakukan pembayaran kepada Kami/ PT {{pt_initial}} sebesar ' . number_format($data['total_remaining']) . ' sebagaimana Kami/PT {{pt_initial}} sebutkan pada poin nomor 2, 3 dan 4 tersebut diatas, maka Form Pemesanan No. {{purchaseletter_no}} tertanggal {{tanda_tangan}} dapat Kami/PT {{pt_initial}} batalkan sepihak dan seluruh pembayaran yang telah Bapak/Ibu bayarkan kepada Kami/PT {{pt_initial}} tidak dapat dikembalikan, serta Unit {{unit_number}} di Apartemen {{cluster}} sepenuhnya mutlak menjadi hak Kami/PT {{pt_initial}}, serta Kami/PT CTT dibebaskan dari upaya hukum perdata/pidana/upaya hukum apapun maupun upaya lainnya.
                        </td>
                    </tr>
                </table>
                ' . $page_break . '
                Adapun hal tersebut telah sesuai dengan ketentuan poin nomor (13) syarat dan ketentuan <i>(*tentang pembatalan sepihak*)</i> dalam Formulir pesanan disebutkan sebagai berikut:<br/>
<i>Apabila PEMESAN membatalkan Formulir Pesanan ini dengan sebab dan alasan apapun juga, maka seluruh pembayaran yang telah diterima oleh PENERIMA PESANAN dari PEMESAN tidak dapat ditarik kembali (dikembalikan) dan menjadi hak sepenuhnya PENERIMA PESANAN.</i><br/>
Demikian Surat Peringatan-3 ini disampaikan. Atas perhatian dan kerjasamanya Kami ucapkan terima kasih.';

        $tpl11 = '</div>
                <!--<br/>--><br/>
                <p class="spstyle_p">
                Hormat Kami,</br>
				{{pt_name}}</br>
                <img src="https://ces.ciputragroup.com/webapps/Ciputra/public/app/main/images/ttd_romy_citralandmark.png" width="120" height="60">
                <br/>
                <b><u>Romy Lawandi</u></b><br/>
				<!-- --------------------------------------<br/> -->
				Finance Controller
				<!--{{salesman_name}} (Sales)<br/>-->
                </p>

                <!--<p class="spstyle_p_small"><b>Note</b> : <i>Apabila pada saat surat ini diterima Bapak/Ibu telah melakukan transfer ke VA BCA, mohon untuk segera menghubungi kami, sehingga kami dapat melakukan pengecekan lebih lanjut.</i></p>-->
                </body>
                ';
        $tpl12 = '</div>
                <!--<br/>--><br/>
                <p class="spstyle_p" align="center">
                Hormat Kami,</br>
                {{pt_name}}</br>
                <img src="https://ces.ciputragroup.com/webapps/Ciputra/public/app/main/images/ttd_romy_citralandmark.png" width="120" height="60">
                <img src="https://ces.ciputragroup.com/webapps/Ciputra/public/app/main/images/ttd_pak_ronny.jpeg" width="120" height="60">
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
        $tpl13 .= '</div>
                <!--<br/>--><br/>
                <p class="spstyle_p" align="left">
                Hormat Kami,</br>
                {{pt_name}}</br>
                </br>
                </br>
                </br>
                <!--<img src="https://ces.ciputragroup.com/webapps/Ciputra/public/app/main/images/ttd_romy_citralandmark.png" width="120" height="60">
                <img src="https://ces.ciputragroup.com/webapps/Ciputra/public/app/main/images/ttd_pak_ronny.jpeg" width="120" height="60">-->
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

        if ($spke == 1) {
            $tpl = $tpl1 . $tpl3 . $tpl6 . $tpl7 . $tpl11;
        } elseif ($spke == 2) {
            $tpl = $tpl1 . $tpl4 . $tpl6 . $tpl8 . $tpl11;
        } elseif ($spke == 3) {
            $tpl = $tpl1 . $tpl5 . $tpl6 . $tpl10 . $tpl12;
        } elseif ($spke == 4) {
            $tpl = $tpl9 . $tpl2 . $tpl13;
        } else {
            $tpl = $tpl1 . $tpl3 . $tpl6 . $tpl7 . $tpl11;
        }

        return $word . '<div id="exportContent">' . $tpl . '</div>';
    }
}
