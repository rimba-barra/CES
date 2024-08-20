<?php

/**
 * Description of Default
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Suratperingatan_CitraRayaCityJambi {

	function tgl_indo($tanggal){
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
        $table = "";

        foreach($schedule as $row){
            if($row['indicatorname'] == 'denda'){
                $denda = $row["remaining_denda"];
            }else{
                $denda = $row["denda_terlambatb"];
            }
			// $denda = 0;
			
			// if($row["remaining_balance"] > 0){
				
            $ttldenda_terlambatb=$ttldenda_terlambatb+$denda;
            $ttlremaining_balance=$ttlremaining_balance+$row["remaining_balance"];
            $table .='<tr class="table">
                        <!--<td>'.$row["scheduletype"].'</td>
                        <td class="table">'.$row["termin"].'</td>-->
                        <td class="table">'.$this->tgl_indo(date('Y-m-d',strtotime($row["duedate"]))).'</td>
						<td class="table">'.$row["scheduletype"].' '.$row["termin"].'</td>
                        <td align="right" class="table">'.number_format($row["remaining_balance"]).'</td>
                        <!--<td>'.$row["hari_terlambatb"].'</td><td>'.$row["sp_no"].'</td>--> 
                        <td align="right" class="table">'.number_format($denda).'</td>
                        <td align="right" class="table">'.number_format($row["remaining_balance"]+$denda).'</td>
                    </tr>';
			// }
        }

        $table .='<tr><!--<td>&nbsp</td><td>&nbsp</td>--><td class="table"><b>Total </b></td><td class="table"></td><td align="right" class="table"><b>'.number_format($ttlremaining_balance).'</b></td>
                <!--<td></td><td></td>--> <td align="right" class="table"><b>'.number_format($ttldenda_terlambatb).'</b></td><td align="right"><b>'.number_format($ttlremaining_balance+$ttldenda_terlambatb).'</b></td></b></tr>';

        return $table;
    }
	
	public function getHTMLdefault(){
       return $this->getHTML();
    }
    
	public function getHTML($spke=null,$data){
        // $data["total_tunggakan"] ='11924762';
        // $data["total_tunggakan_text"]='Sebelas Juta Sembilan Ratus Dua Puluh Empat Ribu Tujuh Ratus Enam Puluh Dua';
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
		
		$tgl_print = $this->tgl_indo(date('Y-m-d', strtotime("0 day"))); //default 0 day
		$nomor_sp_teratas = $data["nomor_sp_teratas"];
		$a = explode('/',$nomor_sp_teratas);
		$b = (int)($a[0]);
		if(substr($b,0,1)=="0"){
			$nomor_sp_teratas = $data["nomor_terakhir"];
		}
		if($data['total_schedule'] > 0){
			$page_break = "<div style='page-break-before:always;'><br/><br/></div>";
			// $page_break = "";
		}else{
			$page_break = "";
		}
        $tpl1=
        '<style>
				
				
                .table {
                    border-collapse: collapse;
                }
                .table, .td, .th {
                    border: 1px solid black;
                    font-size:12px;
                }
				
                td{
                    padding:2px 10px;
                }
                body{
					margin: 120px 94px 132px 113px;
                    font-family: "Times New Roman", "Times New Roman", cursive;
                }
                p.spstyle_p, div {
					font-size:16px;
                }
                p.spstyle_p_small{
                    font-size: 12px;
                
                }
                .amiddle{
                    text-align: justify;
                    text-justify: inter-word;
                }
                </style>
                <body>
				<br/>
				
                <p class="spstyle_p">Jambi, <b>'.$tgl_print.'</b></p>
                <p class="spstyle_p">No	: <b>'.$nomor_sp_teratas.'</b><br/>
                    Hal	: <b><u>Surat  Peringatan {{sp_surat_ke}}</b></u> </p> 

                <p class="spstyle_p" style="width: 400px;">Kepada Yth, <br>
                    Bapak/Ibu <b>{{customer_name}}</b><br>
                    {{customer_address}}</p>

                <p class="spstyle_p">Dengan Hormat,<br>
                <div class="amiddle">';
            
            $tpl2 = 
                'Menindaklanjuti <b>Surat Peringatan '.$sp_ke_before.'</b>  No. '.$no_sp_before.' tertanggal '.$tgl_sp_before.', dengan ini kami beritahukan kepada Bapak/Ibu selaku pembeli unit <b>{{unit_number}}, {{cluster}}, CitraRaya City, Mendalo-Jambi, </b>bahwa berdasarkan catatan kami terdapat tunggakan atas pembayaran Rumah sebesar <b>Rp. '.number_format($data["total_tunggakan"]).' ('.ucwords($data["total_tunggakan_text"]).' Rupiah)</b>, dengan rincian terlampir.</p>        
                        ';
						

            $tpl3 = 
                'Melalui surat ini kami beritahukan kepada Bapak/Ibu selaku pembeli unit <b>{{unit_number}}, {{cluster}}, CitraRaya City Mendalo-Jambi, </b>bahwa berdasarkan catatan kami terdapat tunggakan atas pembayaran Kavling/Rumah tersebut sebesar <b>Rp. '.number_format($data["total_tunggakan"]).' ('.ucwords($data["total_tunggakan_text"]).' Rupiah)</b>, dengan rincian terlampir.
                        </p>        
                        ';
						
			$tpl4 = 
                'Menindaklanjuti <b>Surat Peringatan '.$sp_ke_before.'</b>  No. '.$no_sp_before.' tanggal '.$tgl_sp_before.', bersama ini kami beritahukan kepada Bapak/Ibu selaku pembeli unit <b>{{unit_number}}, {{cluster}}, CitraRaya City, Mendalo-Jambi, </b>dan berdasarkan catatan kami, Bapak/Ibu sampai dengan tanggal '.$tgl_print.' belum melaksanakan pembayaran angsuran yang telah jatuh tempo. Atas hal tersebut, total tunggakan yang harus diselesaikan menjadi <b>Rp. '.number_format($data["total_tunggakan"]).' ('.ucwords($data["total_tunggakan_text"]).' Rupiah)</b>, rincian terlampir.</p>        
                        ';
			
			$tpl5 ='Menindaklanjuti <b>Surat Peringatan '.$sp_ke_before.'</b> kami tanggal '.$tgl_sp_before.' dengan No.'.$no_sp_before.', bersama ini kami beritahukan kepada Bapak/Ibu selaku pembeli unit <b>{{unit_number}}</b>, Tipe  <b>{{type_name}}</b>, Cluster <b>{{cluster}},CitraRaya City, Mendalo,Jambi</b>,bahwa pemesanan rumah tersebut menjadi <b>batal.</b>
			<br/><br/>
			<b>Keseluruhan uang</b> yang telah Bapak /Ibu bayarkan <b>tidak</b> dapat <b>dikembalikan.</b> Dengan demikian kami <b>berhak</b> menjual kembali rumah tersebut kepada pihak lain.
			<br/><br/>
			Demikian hal ini kami sampaikan. Atas perhatian dan kerjasamanya, kami ucapkan terima kasih. <br/><br/><br/><br/>';
			
			$tpl6 ='
			'.$page_break.'
			<b><u>LAMPIRAN Tunggakan dan Adm. Keterlambatan</b></u><br/><br/>
			Nama&nbsp;&nbsp;&nbsp;: <b>{{customer_name}}</b><br/>
			Blok&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <b>{{unit_number}} - {{cluster}}, di CitraRaya City, Mendalo, Jambi<b/><br/><br/>
			<div align=right><i>(dalam rupiah)</i></div>
			<table width=100% class="table">
				<tbody align="center" class="table">
				<tr style="background-color: #e8e9ea;font-weight: bold;" class="table">
				<!--<td>Tagihan</td>
					<td>Termin</td>-->
					<td class="table">Tunggakan Bulan</td>
					<td class="table">Keterangan</td>
					<td class="table">Cicilan Pokok</td>
					<!--<td>Keterlambatan (hari) </td>
					<td>Nomor SP - Tanggal SP</td>-->
					<td class="table">Adm. Keterlambatan <br>( s/d {{max_date_w}} )</td>
					<td class="table">Total Dibayar <br>( s/d {{max_date_w}} )</td>
                </tr> 
                {{{list_tagihan}}}
                </tbody></table><br/><br/>
				<p class="spstyle_p_small"><b>Note</b> :<br/><i>Adm. Keterlambatan 0,1% Perhari Dari Setiap Angsuran.</i></p>
				';
			
			$tpl7 ='Kami memberikan waktu sampai dengan tanggal <b>{{max_date_w}}</b> untuk penyelesaian pembayaran tunggakan diatas. Bapak/Ibu dapat menghubungi petugas Collection kami, sdri. <b>Ervinna</b> di nomor telp. <b>6198177 ext. 712</b>
					<br/>
			
            Demikian hal ini kami sampaikan, atas perhatian dan kerjasama yang baik dari Bapak/Ibu kami ucapkan terima kasih. ';
			
			$tpl8 = '
			<p class="spstyle_p">
				Sehubungan dengan hal di atas, mohon Bapak/Ibu dapat segera melakukan pembayaran melalui Virtual Account BCA dengan keterangan sebagai berikut:
                        </p>
						<table style="padding:2px 10px;align:justify;">
				<tr valign="top">
				<td>Nomor Virtual Account
				</td>
				<td align="right">:
				</td>
				<td align="justify"><b>{{va_bca}}</b> 
				</td>
				</tr>
				<tr>
				<td valign="top">Nama
				</td>
				<td align="right">:
				</td>
				<td align="justify">{{customer_name}}
				</td>
				</tr>
				<tr>
				<td valign="top">Nama Perusahaan
				</td>
				<td align="right">:
				</td>
				<td align="justify">CitraRaya City
				</td>
				</tr>
				<tr>
				<td valign="top">Unit
				</td>
				<td align="right">:
				</td>
				<td align="justify">{{unit_number}} {{cluster}}
				</td>
				</tr>
				
				</table>
				
				
				<p>Pembayaran dapat dilakukan dengan menggunakan ATM, Mobile Banking (m-BCA) dan/atau Internet Banking (KlikBCA). Kami memberikan batas waktu kepada Bapak/Ibu untuk menyelesaikan pembayaran tersebut di atas sampai dengan tanggal <b>{{max_date_w}}</b></p>
				<p>Untuk informasi lebih lanjut, Bapak/Ibu dapat menghubungi petugas Collection kami, Saudara <b>Robin/Adi</b> di nomor telepon <b>(0741) 7837477 / 08117490749.</b></p>
					Demikian hal ini kami sampaikan. Atas perhatian dan kerjasama yang baik dari Bapak/Ibu kami ucapkan terima kasih.
					';
			
            $tpl9 = '<style>
                .table {
                    border-collapse: collapse;
                }
                .table, .td, .th {
                    border: 1px solid black;
                    font-size:12px;
                }
				
                td{
                    padding:2px 10px;
                }
                body{
					margin: 120px 94px 132px 113px;
                    font-family: "Times New Roman", "Times New Roman", cursive;
                }
                p.spstyle_p, div {
					font-size:16px;
                }
                p.spstyle_p_small{
                    font-size: 12px;
                
                }
                .amiddle{
                    text-align: justify;
                    text-justify: inter-word;
                }
                </style>
                <body>
				<br/>
				<br/>
                <p class="spstyle_p">Jambi, <b>'.$tgl_print.'</b></p>
                <p class="spstyle_p">No : <b>'.$nomor_sp_teratas.'</b><br/>
                    Hal : <b><u>Surat  Pembatalan</b></u> </p> <br/>

                <p class="spstyle_p" style="width: 310px;">Kepada Yth, <br/>
                    Bapak/Ibu <b>{{customer_name}}</b><br/>
                    {{customer_address}}</p>

                <p class="spstyle_p">Dengan Hormat,<br/>
                <div class="amiddle">'; 
			
			$tpl10 = '
			
			<p class="spstyle_p">
				Sehubungan dengan hal di atas, mohon Bapak/Ibu dapat segera melakukan pembayaran dengan cara:
                        </p>
				<p>
						a.	Transfer ke: <b>CITRA MENDALO PRIMA KSO a/c. 8575.111.111 BCA Cab. Talang Banjar Jambi.</b> Mohon mencantumkan blok, No. ruko/rumah, dan nama pemesan pada kolom berita di slip transfer. Bukti transfer mohon <b>difax ke nomor (0741) 5917878 Up. Robin/Adi</b> dan segera ditukar dengan kuitansi CitraRaya City, atau</b><br/>
						b.	Membayar langsung ke kasir penerimaan City Management Office, Jl. Boulevard Raya Blok A.23 No. 01, CitraRaya City, Mendalo-Jambi dengan uang tunai, bilyet giro  atau debit BCA.
				</p>
				<p>Kami memberikan waktu sampai dengan tanggal <b>{{max_date_w}}</b> untuk penyelesaian pembayaran tunggakan diatas. Apabila sampai dengan tanggal tersebut diatas Bapak/Ibu masih belum melunasinya, maka kami mengganggap Bapak/Ibu membatalkan pemesanan Kavling/Rumah tersebut. <b>Keseluruhan uang</b> yang telah Bapak/Ibu bayarkan <b>tidak dapat dikembalikan.</b> Dengan demikian kami <b>berhak</b> menjual kembali rumah tersebut kepada pihak lain. Untuk tindak lanjut penyelesaian dapat menghubungi petugas Collection kami, Saudara/i <b>Robin/Adi</b> di nomor telepon 08117490749 atau (0741) 580056.</p><br/>
					Demikian hal ini kami sampaikan. Atas perhatian dan kerjasama yang baik dari Bapak/Ibu kami ucapkan terima kasih.
					{{pageBreak3}}';
			
            $tpl11 = '</div>
                <!--<br/>-->
                <p class="spstyle_p">
                Hormat Kami,</br>
				<b>CITRA MENDALO PRIMA KSO</b></br>
                <br/>
                <br/>
                <br/>
                <br/>
                <b><u>	YULINA HENDRY</u></b><br/>
				<!-- --------------------------------------<br/> -->
				FIAT Dept. Head
				<!--{{salesman_name}} (Sales)<br/>-->
				<br>
                <!--&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CC : - Direktur Proyek <br>
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Legal-->
                </p>

                <p class="spstyle_p_small"><b>Note</b> : <i>Apabila pada saat surat ini diterima Bapak/Ibu telah melakukan pembayaran, mohon untuk segera menghubungi kami, sehingga kami dapat menindaklanjutinya.</i></p>
                </body>
                ';
				
			$tpl12 = '</div>
                <!--<br/>-->
                <p class="spstyle_p">
                Hormat Kami,</br>
				<b>CITRA MENDALO PRIMA KSO</b></br>
                <br/>
                <br/>
                <br/>
                <br/>
                <b><u>	Andi Kurniawan</u></b><br/>
				<!-- --------------------------------------<br/> -->
				General Manager
				<!--{{salesman_name}} (Sales)<br/>-->
				<br>
                <!--&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CC : - Direktur Proyek <br>
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Legal-->
                </p>

                <p class="spstyle_p_small"><b>Note</b> : <i>Apabila pada saat surat ini diterima Bapak/Ibu telah melakukan pembayaran, mohon untuk segera menghubungi kami, sehingga kami dapat menindaklanjutinya.</i></p>
                </body>
                ';
				
			$tpl13 = '
			<p class="spstyle_p">
				Sehubungan dengan hal di atas, mohon Bapak/Ibu dapat segera melakukan pembayaran melalui Virtual Account BCA dengan keterangan sebagai berikut:
                        </p>
						<table style="padding:2px 10px;align:justify;">
				<tr valign="top">
				<td>Nomor Virtual Account
				</td>
				<td align="right">:
				</td>
				<td align="justify"><b>{{va_bca}}</b> 
				</td>
				</tr>
				<tr>
				<td valign="top">Nama
				</td>
				<td align="right">:
				</td>
				<td align="justify">{{customer_name}}
				</td>
				</tr>
				<tr>
				<td valign="top">Nama Perusahaan
				</td>
				<td align="right">:
				</td>
				<td align="justify">CitraRaya City
				</td>
				</tr>
				<tr>
				<td valign="top">Unit
				</td>
				<td align="right">:
				</td>
				<td align="justify">{{unit_number}} {{cluster}}
				</td>
				</tr>
				
				</table>
				
				
				<p>Pembayaran dapat dilakukan dengan menggunakan ATM, Mobile Banking (m-BCA) dan/atau Internet Banking (KlikBCA).</p>
				<p>Kami memberikan waktu sampai dengan tanggal <b>{{max_date_w}}</b> untuk penyelesaian pembayaran tunggakan diatas. Apabila sampai dengan tanggal tersebut diatas Bapak/Ibu masih belum melunasinya, maka kami mengganggap Bapak/Ibu membatalkan pemesanan Kavling/Rumah tersebut. <b>Keseluruhan uang</b> yang telah Bapak/Ibu bayarkan <b>tidak dapat dikembalikan</b>. Dengan demikian kami <b>berhak</b> menjual kembali rumah tersebut kepada pihak lain. Untuk tindak lanjut penyelesaian dapat menghubungi petugas Collection kami, Saudara <b>Robin/Adi</b> di nomor telepon (0741) 7837477 / 08117490749.</p>
					Demikian hal ini kami sampaikan. Atas perhatian dan kerjasama yang baik dari Bapak/Ibu kami ucapkan terima kasih.
					';
				$tpl14 .= '</div>
                <!--<br/>-->
                <p class="spstyle_p">
                Hormat Kami,</br>
				<b>CITRA MENDALO PRIMA KSO</b></br>
                <br/>
                <br/>
				<br/>
                <b><u>	YULINA HENDRY</u></b><br/>
				<!-- --------------------------------------<br/> -->
				FIAT Dept. Head
				<!--{{salesman_name}} (Sales)<br/>-->
				<br>
                <!--&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CC : - Direktur Proyek <br>
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Legal-->
                </p>

                <p class="spstyle_p_small"><b>Note</b> : <i>Apabila pada saat surat ini diterima Bapak/Ibu telah melakukan pembayaran, mohon untuk segera menghubungi kami, sehingga kami dapat menindaklanjutinya.</i></p>
                </body>
                ';
        if($spke==1){
            $tpl = $tpl1.$tpl3.$tpl8.$tpl11.$tpl6;
        }
        elseif($spke==2){
            $tpl = $tpl1.$tpl2.$tpl8.$tpl11.$tpl6;
        }
        elseif($spke==3){
            $tpl = $tpl1.$tpl4.$tpl13.$tpl14.$tpl6;
        }
        elseif($spke==4){
            $tpl = $tpl9.$tpl5.$tpl12;
        }else{
            $tpl = $tpl1.$tpl3.$tpl6.$tpl7.$tpl11;
        }
        
        return $word.'<div id="exportContent">'.$tpl.'</div>';
    }
}
