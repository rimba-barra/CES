<?php

/**
 * Description of Default
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Suratperingatan_CitraLandPalu {
    		
	public function tgl_indo($tanggal){
		$bulan = array (
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
		return $pecahkan[2] . ' ' . $bulan[ (int)$pecahkan[1] ] . ' ' . $pecahkan[0];
	}
	
    public function getListTagihanHTML($params){

        
		$schedule = $params["schedule"][0];
        $total = 0.0;
        $ttldenda_terlambatb=0;
        $ttlremaining_balance=0;
		$ttlhariterlambat=0;
		$ttl=0;
        $table = "";

        foreach($schedule as $row){
            $tgl1 = new DateTime($row["duedate"]);
            $tgl2 = new DateTime( date('Y-m-d'));
            $selisihhari = $tgl2->diff($tgl1)->days;
            // $selisihhari = date('Y-m-d')-$row["duedate"];
                $denda = $row["remaining_denda"];
            $ttldenda_terlambatb=$ttldenda_terlambatb+$denda;
            $ttlremaining_balance=$ttlremaining_balance+$row["remaining_balance"];
			$ttlhariterlambat=$ttlhariterlambat+$selisihhari;
			$ttl=$ttl+($row["remaining_balance"]+$denda);
            $table .='<tr style="font-size: 10pt;">
                        <td>'.$row["scheduletype"].' '.$row["termin"].'</td>
                        <td>'.$this->tgl_indo(date('Y-m-d',strtotime($row["duedate"]))).'</td>
						<td align="center">'.$selisihhari.'</td>
                        <td align="right">Rp. '.number_format($row["remaining_balance"]).'</td>
						<td align="right">Rp. '.number_format($denda).'</td>
                        <td align="right">Rp. '.number_format($row["remaining_balance"]+$denda).'</td>
                    </tr>';
        }

        $table .='<tr style="font-size: 10pt;"><td>&nbsp</td><td>&nbsp</td><td align="center">'.($ttlhariterlambat).'</td>
                <!--<td></td><td></td>--> <td align="right">Rp. '.number_format($ttlremaining_balance).'</td><td align="right">Rp. '.number_format($ttldenda_terlambatb).'</td><td align="right">Rp. '.number_format($ttl).'</td></tr>';

        return $table;
    }
	
	public function getHTMLdefault(){
       return $this->getHTML();
    }
	
	public function getHTML($spke=null, $data){
		if($spke==1){
            $sp_ke_before = $spke;
            $no_sp_before = $data['sp1'];
            $no_sp = $data['sp1'];
            $tgl_sp_before = $data['sp1_date'];
            $sp1_date = $this->tgl_indo(date('Y-m-d', strtotime($data['sp1_date'])));
        }elseif($spke==2){
            $sp_ke_before = $spke-1;
            $no_sp_before = $data['sp1'];
            $no_sp = $data['sp2'];
            $tgl_sp_before = $data['sp1_date'];
            $sp2_date = $this->tgl_indo(date('Y-m-d', strtotime($data['sp2_date'])));
        }elseif($spke==3){
            $sp_ke_before = $spke-1;
            $no_sp_before = $data['sp2'];
            $no_sp = $data['sp3'];
            $tgl_sp_before = $data['sp2_date'];
            $sp3_date = $this->tgl_indo(date('Y-m-d', strtotime($data['sp3_date'])));
        }else{
            $sp_ke_before = $spke-1;
            $no_sp_before = $data['sp3'];
            $no_sp = $data['sp4'];
            $tgl_sp_before = $data['sp3_date'];
            $sp4_date = $this->tgl_indo(date('Y-m-d', strtotime($data['sp4_date'])));
        }
		$word = "";
        if($data['is_printpreview'] == 1){
            $namafile = trim($data['cluster'].'_'.$data['unit_number']).'_'.date('d-m-Y'); 
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
		$tgl_print = $this->tgl_indo(date('Y-m-d', strtotime("0 day"))); //default 0 day
        $tpl1=
        '<style>
				
				
                table {
                    border-collapse: collapse;
                }
                table, td, th {
                    border: 1px solid black;
                    font-size:11pt;
                }
				
                td{
                    padding:2px 10px;
                }
                body{
                    font-size: 11pt;
                    font-family: "Comic Sans MS", "Comic Sans", cursive;
                }
                p.spstyle_p, div {
                    font-size: 11pt;
                }
                p.spstyle_p_small{
                    font-size: 10px;
                
                }
                .amiddle{
                    text-align: justify;
                    text-justify: inter-word;
                }
                </style>
                <body style="font-size: 11pt;">
                <!--<p class="spstyle_p">Jakarta, <b>{{tanggal_print_w}}</b></p>-->
				<p class="spstyle_p" align="right">Palu, '.$tgl_print.'</p>
                <p class="spstyle_p">No. : '.$no_sp.'<br/>
                    Hal : Surat  Pemberitahuan {{sp_surat_ke}}</p> 

                <p class="spstyle_p" style="width: 310px;">Kepada Yth, <br>
                    Bapak/Ibu <b>{{customer_name}}</b><br>
                    {{customer_address}}</p>

                <p style="text-align: justify;" class="spstyle_p">Dengan Hormat,<br>
                <div class="amiddle">';
            
            $tpl2 = 
                '<p style="text-align: justify;font-size: 11pt;">Menindaklanjuti <b>Surat Pemberitahuan 1</b> kami tanggal '.$sp1_date.' dengan surat <b>No.'.$data['sp1'].'</b>dengan pembelian rumah di CitraLand  Palu, kawasan <b>{{cluster}}</b> blok <b>{{unit_number}}</b> sesuai dengan  Surat Pemesanan Tanah dan Bangunan (SPT) Nomor : {{sppjb_no}} tanggal '.$this->tgl_indo(date('Y-m-d',strtotime($row["sppjb_date"]))).' Dengan tidak bermaksud mengganggu kesibukan  Bapak/Ibu, kami ingin memberitahukan tentang angsuran yang telah jatuh tempo berikut:</p>
                        ';

            $tpl3 = 
                '<p style="text-align: justify;font-size: 11pt;">Pertama-tama  kami mengucapkan terima kasih atas kepercayaan Bapak/Ibu terhadap produk kami, dengan  pembelian rumah di CitraLand Palu, kawasan <b>{{cluster}}</b>, blok <b>{{unit_number}}</b> sesuai dengan Surat Pemesanan Tanah dan Bangunan (SPT) Nomor : <b>'.$data['purchaseletter_no'].'</b> tanggal <b>{{sp1_date}}</b>. Dengan tidak bermaksud mengganggu kesibukan  Bapak/Ibu, kami ingin memberitahukan tentang angsuran yang telah jatuh tempo berikut:
                        </p>        
                        ';
						
			$tpl4 = 
                '<style>
				
				
                table {
                    border-collapse: collapse;
                }
                table, td, th {
                    border: 1px solid black;
                    font-size:11pt;
                }
				
                td{
                    padding:2px 10px;
                }
                body{
                    font-size: 11pt;
                    font-family: "Comic Sans MS", "Comic Sans", cursive;
                }
                p.spstyle_p, div {
                    font-size: 11pt;
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
                <!--<p class="spstyle_p">Jakarta, <b>{{tanggal_print_w}}</b></p>-->
				<p class="spstyle_p" align="right">Palu, '.$tgl_print.'</p>
                <p class="spstyle_p">No. : '.$no_sp.'<br/>
                    Hal : <b>Surat Informasi Pembatalan {{unit_number}}</b></p> 

                <p class="spstyle_p" style="width: 310px;">Kepada Yth, <br>
                    Bapak/Ibu <b>{{customer_name}}</b><br>
                    {{customer_address}}</p>

                <p class="spstyle_p">Dengan Hormat,<br>
                <div class="amiddle">';
			
			$tpl5 =
			'<style>
				
				
                table {
                    border-collapse: collapse;
                }
                table, td, th {
                    border: 1px solid black;
                    font-size:11pt;
                }
				
                td{
                    padding:2px 10px;
                }
                body{
                    font-size: 11pt;
                    font-family: "Comic Sans MS", "Comic Sans", cursive;
                }
                p.spstyle_p, div {
                    font-size: 11pt;
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
                <!--<p class="spstyle_p">Jakarta, <b>{{tanggal_print_w}}</b></p>-->
				<p class="spstyle_p" align="right">Palu, '.$tgl_print.'</p>
                <p class="spstyle_p">No. : '.$no_sp.'<br/>
                    Hal : <b>Surat  Pembatalan</b></p> 

                <p class="spstyle_p" style="width: 310px;">Kepada Yth, <br>
                    Bapak/Ibu <b>{{customer_name}}</b><br>
                    {{customer_address}}</p>

                <p class="spstyle_p">Dengan Hormat,<br>
                <div class="amiddle">';
			
			$tpl6 ='
			
			<table width=100%>
				<tbody align="center">
				<tr style="font-size: 11pt;background-color: #e8e9ea;font-weight: bold;text-align: center;">
					<td>KET</td>
					<td>TGLJT</td>
					<td>TERLAMBAT</td>
					<td>ANGSURAN</td>
					<td>DENDA</td>
					<td>TOTAL</td>
                </tr> 
                {{{list_tagihan}}}
                </tbody></table>
				
			{{{pageBreak3}}}   
			<p style="text-align: justify;"><i style="text-align: justify;">Total tagihan sebesar Rp. '.number_format($data['total_tunggakan_sh2']).'.-'.$data['total_tunggakan_sh2_text'].'</i></p>
                        <p class="spstyle_p">
			
							';
			
			$tpl7 ='<p style="text-align: justify;">Menindaklanjuti <b>Surat Pemberitahuan II</b> kami tanggal '.$sp2_date.' dengan surat <b>No.'.$data['sp2'].'</b>dengan pembelian rumah di CitraLand  Palu, kawasan <b>{{cluster}}</b> blok <b>{{unit_number}}</b> sesuai dengan  Surat Pemesanan Tanah dan Bangunan (SPT) Nomor : {{sppjb_no}} tanggal '.$this->tgl_indo(date('Y-m-d',strtotime($row["sppjb_date"]))).'. Bersama ini kami informasikan bahwa selambat-lambatnya sampai dengan tanggal <b>{{sp3_date}}</b>, apabila belum ada konfirmasi balik dari pihak ibu, maka dengan sangat menyesal kami harus <b>membatalkan secara sepihak</b> transaksi pembelian rumah tersebut sehingga kami dapat menjualnya kepada pihak lain</p> <br/>
						Adapun dari jumlah uang terbayar tidak dikembalikan setelah dilakukan pemotongan sebagaimana tertera dalam SPT, dengan perincian sbb :</p>
                        ';
			
			$tpl8 = '<p style="text-align: justify;">Sampai saat ini kami belum menerima pembayaran Bapak/Ibu. Kami mohon agar dapat melunasi pembayaran tersebut, adapun pembayarannya dapat ditranfer ke rekening kami :</p>

			<table>
            <tbody>
            <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
            <td>
            <table width="100%" style="font-family: Arial Narrow; font-size: 11pt;">
            <tbody>
            <tr style="vertical-align: text-top; text-align: justify;">
            <td style="width: 823px;"><b>Bank BCA Cab Mayjend Sungkono, Surabaya</b></td>
            </tr>
            </tbody>
            </table>
            <table style="height: 26px; width: 415px;">
            <tbody>
            <tr style="vertical-align: text-top; text-align: justify;">
            <td style="width: 138px;"><b>Nomor Rekening</b></td>
            <td style="width: 14px; text-align: left;"><b>:</b></td>
            <td style="width: 262px;"><b>0871363888</b></td>
            </tr>
            <tr style="vertical-align: text-top; text-align: justify;">
            <td style="width: 138px;"><b>Atas Nama</b></td>
            <td style="width: 14px;"><b>:</b></td>
            <td style="width: 262px;"><b>Ciputra Surya JO PT</b></td>
            </tr>
            </tbody>
            </table>
            <table style="height: 19px;" width="416">
            <tbody>
            <tr>
            <td style="width: 415px;"><b>atau ke Marketing Gallery CitraLand Palu</b></td>
            </tr>
            </tbody>
            </table>
            </td>
            </tr>
            </tbody>
            </table>

			<p style="text-align: justify;">akan tetapi jika Bapak/Ibu telah menyelesaikan kewajiban tersebut, kami mohon bukti pembayarannya dapat di kirim kenomor WA (08114503088) dan pemberitahuan ini dapat di abaikan. Untuk informasi dan konfirmasi pembayaran dapat menghubungi collection CitraLand Palu di nomor telp 0451-488888/08114503088.</p>
			Atas perhatian dan kerjasamanya kami ucapkan terima kasih</p>';
			
            $tpl9 = '<table style="height: 155px;" border="1"  width="555">
				<tbody>
				<tr>
				<td style="width: 184px;"><b>Uang Masuk</b></td>
				<td style="width: 185px;">Tanda Jadi</td>
				<td style="width: 185px;">&nbsp;</td>
				</tr>
				<tr>
				<td style="width: 184px;">&nbsp;</td>
				<td style="width: 185px;">&nbsp;</td>
				<td style="width: 185px;">&nbsp;</td>
				</tr>
				<tr>
				<td style="width: 184px;">&nbsp;</td>
				<td style="width: 185px;"><b>Total Uang Masuk</b></td>
				<td style="width: 185px;">&nbsp;</td>
				</tr>
				<tr>
				<td style="width: 184px;"><b>Pemotongan</b></td>
				<td style="width: 185px;">&nbsp;</td>
				<td style="width: 185px;">&nbsp;</td>
				</tr>
				<tr>
				<td style="width: 184px;">&nbsp;</td>
				<td style="width: 185px;">&nbsp;</td>
				<td style="width: 185px;">&nbsp;</td>
				</tr>
				<tr>
				<td style="width: 184px;">&nbsp;</td>
				<td style="width: 185px;"><b>Total Pemotongan</b></td>
				<td style="width: 185px;">&nbsp;</td>
				</tr>
				<tr>
				<td style="width: 184px;"><b>Sisa</b></td>
				<td style="width: 185px;"><b>Total Pengembalian</b></td>
				<td style="width: 185px;">&nbsp;</td>
				</tr>
				</tbody>
				</table>'; 
			
			$tpl10 = '<p style="text-align: justify;">Kami memberikan waktu sampai dengan tanggal <b>{{max_date_w}}</b> untuk penyelesaian pembayaran diatas. Untuk tindak lanjut penyelesaian dapat menghubungi petugas collection kami di no. telp. <b>6198177 ext. 712/710 Ervinna/Mega</b>
			<br>
			<br>
			Apabila lewat dari tanggal tersebut diatas Bapak/Ibu masih belum melunasinya, maka dengan sangat menyesal kami mengganggap Bapak/Ibu <b>membatalkan pemesanan unit</b> tersebut. Keseluruhan uang yang telah Bapak/Ibu bayarkan <b>tidak dapat dikembalikan.</b> Dengan demikian kami <b>berhak menjual kembali unit</b> tersebut kepada pihak lain.
					
					<br/>
            Demikian hal ini kami sampaikan, atas perhatian dan kerjasama yang baik dari Bapak/Ibu kami ucapkan terima kasih.</p> '; 
			
			$tpl11 = '</div>
                <br/>
                <p class="spstyle_p">
                Hormat Kami,</br>
                <br/>
                <br/>
                <br/>
                <br/>
                <b><u>Erlyn Trivita Rizky</u></b><br/>
				Finance Controller
				</p>
                <p style="text-align: justify;font-size: 8pt;" class="spstyle_p_small">*Denda diatas, adalah nilai denda sementara sampai dengan saat Surat Peringatan dicetak, hari keterlambatan akan di hitung ulang saat pembayaran dilakukan</p>
                </body>
                ';
            $tpl12 = '</div>
                <!--<br/>--><br/>
                <p class="spstyle_p" style="margin-left:5em">
                Hormat Kami,&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
				&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Mengetahui,</br>
                <br/>
                <br/>
                <br/>
                <br/>
                <b><u>Erlyn Trivita Rizky</b></u>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
				&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<b><u>Pierre Marciano Leuwol</u></b><br/>
				<!-- --------------------------------------<br/> -->
				Finance Controller&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
				&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;General Manager
				</p>
                </body>
                ';
			$tpl13 ='<p>akan tetapi jika Bapak/Ibu telah menyelesaikan kewajiban tersebut, kami mohon bukti pembayarannya dapat di kirim kenomor WA (08114503088) dan pemberitahuan ini dapat di abaikan. Untuk informasi dan konfirmasi pembayaran dapat menghubungi collection CitraLand Palu di nomor telp 0451-488888/08114503088.</p>
			Atas perhatian dan kerjasamanya kami ucapkan terima kasih';
			$tpl14 ='<p>Pengembalian ini akan diproses setelah Bapak/Ibu menyerahkan kembali Surat Pemesanan Tanah dan Bangunan (Warna Merah Muda) serta Kwitansi Asli Tanda Jadi, AJB+BPHTB+PNBP dan Uang Muka yang pernah diserahkan oleh marketing kami, serta form rekening dan dokumen pendukung lainnya.</p>
			<p>Kami berharap kita masih dapat berhubungan baik di kemudian hari. Atas perhatian dan kerjasamanya kami ucapkan terima kasih .</p>
			Untuk informasi lebih lanjut dapat menghubungi collection CitraLand Palu di nomor telp 0451-488888. 
			Atas perhatian dan kerjasamanya kami ucapkan terima kasih.
			';
			$tpl15 .='Menindaklanjuti surat kami sebelumnya:<br/>
			<p class="spstyle_p" style="margin-left:2em">1.	Surat peringatan 1 nomor '.$data['sp1'].' tanggal '.$data['sp1_date'].'</p>
			<p class="spstyle_p" style="margin-left:2em">2.	Surat peringatan II nomor '.$data['sp2'].' tanggal '.$data['sp2_date'].'</p>
			<p class="spstyle_p" style="margin-left:2em">3.	Surat informasi pembatalan nomor '.$data['sp3'].' tanggal '.$data['sp3_date'].'</p>
			dengan ini kami sampaikan bahwa sampai dengan saat ini kami belum menerima pembayaran rumah/kavling di Blok {{unit_number}}
			Oleh karena itu dengan sangat menyesal kami anggap Bapak / Ibu telah membatalkan pemesanan rumah/kavling {{cluster}} di blok {{unit_number}} CitraLand Palu dengan surat pemesanan tanah No: {{sppjb_no}}
			dan melalui surat ini kami sampaikan <b>Konfirmasi Pembatalan unit tersebut. Uang yang telahBapak/Ibu bayarkan akan kami perhitungkan sesuai dengan ketentuan pada Surat Pemesasan tanah ( SPT) tentang pembatalan dan kami berhak membatalkan sepihak untuk menjual kembali unit tersebut kepada pihak lain.</b><br/>
			Adapun dari jumlah uang terbayar, akan dikembalikan setelah dilakukan pemotongan sebagaimana tertera dalam SPT, dengan perincian sbb :<br/>
			';
			
        if($spke==1){
            $tpl = $tpl1.$tpl3.$tpl6.$tpl8.$tpl11;
        }
        elseif($spke==2){
            $tpl = $tpl1.$tpl2.$tpl6.$tpl8.$tpl11;
        }
        elseif($spke==3){
            $tpl = $tpl4.$tpl7.$tpl9.$tpl13.$tpl12;
        }
        elseif($spke==4){
            $tpl = $tpl5.$tpl15.$tpl9.$tpl14.$tpl12;
        }else{
            $tpl = $tpl1.$tpl3.$tpl6.$tpl7.$tpl11;
        }
        
        return $word.'<div id="exportContent">'.$tpl.'</div>';
    }
		
}
