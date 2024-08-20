<?php

/**
 * Description of Default
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Suratperingatan_CitraCityBalikpapan
{

    public function tgl_indo($tanggal)
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

        foreach ($schedule as $row) {
            if ($row['indicatorname'] == 'denda') {
                $denda = $row["remaining_denda"];
            } else {
                $denda = $row["remaining_denda"];
            }
            $ttldenda_terlambatb = $ttldenda_terlambatb + $denda;
            $ttlremaining_balance = $ttlremaining_balance + $row["remaining_balance"];
            $table .= '<tr>
                        <!--<td>' . $row["scheduletype"] . '</td>
                        <td>' . $row["termin"] . '</td>-->
                        <td>' . $this->tgl_indo(date('Y-m-d', strtotime($row["duedate"]))) . '</td>
                        <td align="right">Rp. ' . number_format($row["remaining_balance"]) . '</td>
                        <!--<td>' . $row["hari_terlambatb"] . '</td><td>' . $row["sp_no"] . '</td>--> 
                        <td align="right">Rp. ' . number_format($denda) . '</td>
                        <td align="right">Rp. ' . number_format($row["remaining_balance"] + round($denda)) . '</td>
                    </tr>';
        }

        $table .= '<tr><!--<td>&nbsp</td><td>&nbsp</td>--><td>Total </td><td align="right">Rp. ' . number_format($ttlremaining_balance) . '</td>
                <!--<td></td><td></td>--> <td align="right">Rp. ' . number_format($ttldenda_terlambatb) . '</td><td align="right">Rp. ' . number_format($ttlremaining_balance + $ttldenda_terlambatb) . '</td></tr>';

        return $table;
    }

    public function getHTMLdefault()
    {
        return $this->getHTML();
    }

    public function getHTML($spke = null, $data)
    {
        $tgl_print = $this->tgl_indo(date('Y-m-d', strtotime("0 day"))); //default 0 day
        $nomor_sp_teratas = $data["nomor_sp_teratas"];
        $a = explode('/', $nomor_sp_teratas);
        $b = (int)($a[0]);
        if (substr($b, 0, 1) == "0") {
            if ($data['pt_id'] == 31) {
                $nomor_sp_teratas = str_replace("CR-KEU", "AKCS-KEU", $data["nomor_terakhir"]);
            }
            else if ($data['pt_id'] == 5240) {
                $nomor_sp_teratas = str_replace("CR-KEU", "CER-KEU", $data["nomor_terakhir"]);
            }
            else {
                $nomor_sp_teratas = $data["nomor_terakhir"];
                }
            }

        $word = "";
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
				<br/>
				<br/>
				<br/>
                <br/>
                <p class="spstyle_p">Balikpapan,' . $tgl_print . '</p>
                <p class="spstyle_p">No	: ' . $nomor_sp_teratas . '<br/>
                    Hal	: Surat Peringatan {{sp_surat_ke_new}} </p> 

                <p class="spstyle_p" style="width: 310px;">Kepada Yth, <br>
                    <b>Bapak/Ibu {{customer_name}}</b><br>
                    {{customer_address}}</p>

                <p class="spstyle_p">Dengan Hormat,<br>
                <div class="amiddle">';

        $tpl2 =
            'Menindaklanjuti Surat Peringatan 1 kami No.{{sp1}} tertanggal <b>{{tgl_sp1}}</b>, berdasarkan catatan kami bahwa Bapak/Ibu sampai dengan tanggal <b>' . $tgl_print . '</b> belum melaksanakan pembayaran angsuran <b>Type {{type_name}} Blok {{unit_number}} Kaw. {{cluster}} ( {{cluster_code}} )</b>. Atas hal tersebut, total tunggakan yang harus diselesaikan menjadi sebagai berikut (dalam rupiah) :</p>        
                        <br/>';

        $tpl3 =
            'Melalui surat ini kami informasikan kepada Bapak/Ibu bahwa berdasarkan catatan kami sampai dengan <b>tanggal ' . $tgl_print . '</b> masih belum melakukan pembayaran angsuran <b>Type {{type_name}} Blok {{unit_number}} Kaw. {{cluster}} ({{cluster_code}})</b>. Atas hal tersebut, total tunggakan yang harus diselesaikan menjadi sbb (dalam rupiah) :
                        </p>        
                        ';

        $tpl4 =
            'Menindaklanjuti <b>Surat Peringatan 2</b> kami <b>No.{{sp2}}</b> tertanggal <b>{{tgl_sp2}}</b> , berdasarkan catatan kami bahwa Bapak/Ibu sampai dengan tanggal <b>' . $tgl_print . '</b> masih belum melaksanakan pembayaran angsuran <b>Type {{type_name}} Blok {{unit_number}} Kaw. {{cluster}} ( {{cluster_code}} )</b>. Atas hal tersebut, total tunggakan yang harus diselesaikan menjadi sebagai berikut (dalam rupiah) :</p>        ';

        $tpl5 = 'Sesuai dengan Informasi pesan singkat (via WA) tertanggal ' . $tgl_print . ' yang kami <b>( ' . $data['pic_collection'] . ' Collection )</b> terima dari Sales Marketing 
            <b>' . strtoupper($data['salesman_name']) . '</b>, bahwa Bapak/Ibu mengundurkan diri dari pembelian tanah dan bangunan <b>Type {{type_name}} Blok {{unit_number}} Kaw. {{cluster}} ( {{cluster_code}} )</b>.
			<br/><br/>
			Keseluruhan uang yang telah Bapak /Ibu bayarkan <b>tidak dapat dikembalikan</b>. Dengan demikian kami <b>berhak menjual</b> kembali tanah dan bangunan tersebut kepada pihak lain.<br/>
            Untuk keterangan lebih jelas bisa menghubungi petugas Collection kami, <b>sdri ' . $data['pic_collection'] . '</b> di pesawat <b>22596888, 22596999 ext ' . $data['sp_ext_pic'] . '<b/>.<br/>
            <br>
			<br>
			Demikian hal ini kami sampaikan. Atas perhatian dan kerjasamanya, kami ucapkan terima kasih.';

        $tpl6 = '
			<table width=80%>
				<tbody align="center">
				<tr style="background-color: #e8e9ea;font-weight: bold;">
				<!--<td>Tagihan</td>
					<td>Termin</td>-->
					<td>Tunggakan Bulan</td>
					<td>Cicilan Pokok</td>
					<!--<td>Keterlambatan (hari) </td>
					<td>Nomor SP - Tanggal SP</td>-->
					<td>Denda <br>( s/d {{max_date_w}} )</td>
					<td>Total <br>( s/d {{max_date_w}} )</td>
                </tr> 
                {{{list_tagihan}}}
                </tbody></table>
				
			{{{pageBreak3}}}   
			Denda keterlambatan diatas akan berubah sampai dengan pembayaran
                        <br/> <p class="spstyle_p">
			Sehubungan dengan hal diatas, mohon Bapak/Ibu dapat segera melakukan pembayaran paling lambat tanggal <b>{{max_date_w}}</b> dengan cara:	
                        </p>
				<p>
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;• &nbsp;&nbsp;<b>Transfer melalui No VA BCA ' . $data['va_bca'] . ' a/n Bapak/Ibu {{customer_name}}</b><br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;• &nbsp;&nbsp;<b>Transfer melalui No VA MANDIRI {{va_mandiri}} a/n Bapak/Ibu {{customer_name}}</b><br/>
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;• &nbsp;&nbsp;Untuk pembayaran langsung ke kasir penerimaan kantor pemasaran CitraRaya :<br/><br/>
                <table style="border:none;">
                    <tr style="border:none;">
                        <td valign="top" style="border:none;" width="1" align="left">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a.&nbsp;</td>
                        <td align="justify" style="border:none;">
                            Pembiayaan Inhouse/Cash dengan Giro/Cek jatuh tempo, Kartu Debit atau Kartu Kredit (dikenakan biaya administrasi sesuai ketentuan yang berlaku).
                        </td>
                    </tr></table><br/>
                <table style="border:none;">
                    <tr>
                        <td valign="top" style="border:none;" width="1" align="left">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b.&nbsp;</td>
                        <td align="justify" style="border:none;">
                            Pembiayaan KPR dengan Giro/Cek jatuh tempo, atau Kartu Debit atas nama pemesan atau suami/istri (dikenakan biaya administrasi sesuai ketentuan yang berlaku).
                        </td>

                    </tr>
                </table>
                
                <br/><br/>
                Kelalaian dan/ atau keterlambatan kewajiban pembayaran diatas akan mempengaruhi waktu janji serah terima Unit tersebut. Kepastian waktu serah terima Unit akan kami informasikan lebih lanjut setelah dilakukannya kewajiban pembayaran diatas.<br/>
				</p>
							';

        $tpl7 = 'Kami memberikan waktu sampai dengan tanggal <b>{{max_date_w}}</b> untuk penyelesaian pembayaran tunggakan diatas bersamaan dengan angsuran bulan berjalan. Untuk tindak lanjut penyelesaian dapat menghubungi petugas Collection kami, <b>sdri ' . $data['pic_collection'] . '</b> di pesawat <b>22596888, 22596999 ext 237.</b>
					<br/>
            Demikian hal ini kami sampaikan, atas perhatian dan kerjasama yang baik dari Bapak/Ibu kami ucapkan terima kasih. ';

        $tpl8 = 'Untuk tindak lanjut penyelesaian dapat menghubungi petugas Collection kami, <b>sdri ' . $data['pic_collection'] . '</b> di pesawat <b>22596888, 22596999 ext ' . $data['sp_ext_pic'] . '.</b>
					<br/><br/>
            Demikian hal ini kami sampaikan atas perhatiannya kami ucapkan terima kasih. ';

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
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
                <p class="spstyle_p">Balikpapan, <b>' . $tgl_print . '</b></p>
                <p class="spstyle_p">No	: <b>' . $nomor_sp_teratas . '</b><br/>
                    Hal	: <b>Surat Pembatalan</b></p> <br/>

                <p class="spstyle_p" style="width: 310px;">Kepada Yth, <br/>
                    Bapak/Ibu <b>{{customer_name}}</b><br/>
                    {{customer_address}}</p><br/>

                <p class="spstyle_p">Dengan Hormat,<br/>
                <div class="amiddle">';

        $tpl10 = 'Kami memberikan waktu sampai dengan tanggal <b>{{max_date_w}}</b> untuk penyelesaian pembayaran tunggakan diatas bersamaan dengan angsuran bulan berjalan. Untuk tindak lanjut penyelesaian dapat menghubungi petugas Collection kami, <b>sdri ' . $data['pic_collection'] . '</b> di pesawat <b>22596888, 22596999 ext ' . $data['sp_ext_pic'] . '.</b>
			<br>
				Apabila lewat dari tanggal tersebut diatas maka dengan sangat menyesal kami menganggap Bapak/Ibu membatalkan pemesanan tanah dan bangunan tersebut serta uang yang telah dibayarkan tidak dapat dikembalikan.
			<br/>
			<br/>					
					<br/>
            Demikian hal ini kami sampaikan, atas perhatian dan kerjasama yang baik dari Bapak/Ibu kami ucapkan terima kasih. ';

        $tpl11 = '</div>
                <!--<br/>--><br/><br/>
                <p class="spstyle_p">
                Hormat Kami,</br>
				<b> {{pt_name }} </b></br>
                <br/>
                <br/>
                <br/>
                <br/>
                <b><u>Afriansyah</u></b><br/>
				<!-- --------------------------------------<br/> -->
				Finance Controller
				<!--{{salesman_name}} (Sales)<br/>-->
                </p>

                <p class="spstyle_p_small"><b>Note</b> : <i>Apabila pada saat surat ini diterima ternyata Bapak/Ibu telah melakukan penyetoran ke rekening kami, mohon untuk diabaikan surat kami atau konfirmasi ke petugas collection kami sdri <b>' . $data['pic_collection'] . '</b>, <b>email ; ' . $data['sp_email_pic'] . '</b> sehingga kami dapat melakukan pengecekan lebih lanjut.</i></p>
                </body>
                ';
				
        $tpl12 .= '</div>
                <!--<br/>--><br/><br/>
                <p class="spstyle_p">
                Hormat Kami,</br>
				<b>{{pt_name}}</b></br>
                <br/>
                <br/>
                <br/>
                <br/>
                <b><u>SEOGIANTO MIHARDJA</b></u><br/>
				<!-- --------------------------------------<br/> -->
				Associate Director
				<!--{{salesman_name}} (Sales)<br/>-->
                </p>

                <!--<p class="spstyle_p_small"><b>Note</b> : <i>Apabila pada saat surat ini diterima ternyata Bapak/Ibu telah melakukan penyetoran ke rekening kami, mohon untuk diabaikan surat kami atau mengirimkan buktitransfer/setoran via fax no.29660928 Up. Dwi., sehingga kami dapat melakukan pengecekan lebih lanjut.</i></p>-->
                </body>
                ';
				
		$tpl13 = '<style>
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
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
                <p class="spstyle_p">Balikpapan, <b>' . $tgl_print . '</b></p>
                <p class="spstyle_p">No	: <b>' . $nomor_sp_teratas . '</b><br/>
                    Hal	: <b>Surat Pemberitahuan</b></p> <br/>

                <p class="spstyle_p" style="width: 310px;">Kepada Yth, <br/>
                    Bapak/Ibu <b>{{customer_name}}</b><br/>
                    {{customer_address}}</p><br/>

                <p class="spstyle_p">Dengan Hormat,<br/>
                <div class="amiddle">';

        if ($spke == 1) {
            $tpl = $tpl13 . $tpl3 . $tpl6 . $tpl8 . $tpl11;
        } elseif ($spke == 2) {
            $tpl = $tpl1 . $tpl2 . $tpl6 . $tpl7 . $tpl11;
        } elseif ($spke == 3) {
            $tpl = $tpl1 . $tpl4 . $tpl6 . $tpl10 . $tpl11;
        } elseif ($spke == 4) {
            $tpl = $tpl9 . $tpl5 . $tpl12;
        } else {
            $tpl = $tpl1 . $tpl3 . $tpl6 . $tpl7 . $tpl11;
        }

        return $word . '<div id="exportContent">' . $tpl . '</div>';
    }
}
