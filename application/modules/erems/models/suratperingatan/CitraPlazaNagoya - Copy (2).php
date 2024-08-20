<?php

/**
 * Description of Default
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Suratperingatan_CitraPlazaNagoya{

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
            $table .='<tr>
                        <!--<td>'.$row["scheduletype"].'</td>
                        <td>'.$row["termin"].'</td>-->
                        <td>'.$this->tgl_indo(date('Y-m-d',strtotime($row["duedate"]))).'</td>
                        <td align="right">Rp. '.number_format($row["remaining_balance"]).'</td>
                        <!--<td>'.$row["hari_terlambatb"].'</td><td>'.$row["sp_no"].'</td>--> 
                        <td align="right">Rp. '.number_format($denda).'</td>
                        <td align="right">Rp. '.number_format($row["remaining_balance"]+$denda).'</td>
                    </tr>';
			// }
        }

        $table .='<tr><!--<td>&nbsp</td><td>&nbsp</td>--><td>Total </td><td align="right">Rp. '.number_format($ttlremaining_balance).'</td>
                <!--<td></td><td></td>--> <td align="right">Rp. '.number_format($ttldenda_terlambatb).'</td><td align="right">Rp. '.number_format($ttlremaining_balance+$ttldenda_terlambatb).'</td></tr>';

        return $table;
    }
	
	public function getHTMLdefault(){
       return $this->getHTML();
    }
    
	public function getHTML($spke=null,$data){
		
		if($spke==1){
            $sp_ke_before = $spke;
            $no_sp_before = $data['sp1'];
            $no_sp = $data['sp1'];
            $tgl_sp_before = $data['sp1_date'];
        }
        elseif($spke==2){
            $sp_ke_before = $spke-1;
            $no_sp_before = $data['sp1'];
            $no_sp = $data['sp2'];
            $tgl_sp_before = $data['sp1_date'];
        }
        elseif($spke==3){
            $sp_ke_before = $spke-1;
            $no_sp_before = $data['sp2'];
            $no_sp = $data['sp3'];
            $tgl_sp_before = $data['sp2_date'];
        }
        else{
            $sp_ke_before = $spke-1;
            $no_sp_before = $data['sp3'];
            $no_sp = $data['sp4'];
            $tgl_sp_before = $data['sp3_date'];
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
		if($data['total_schedule'] > 4){
			$page_break = "<div style='page-break-before:always;'><br/><br/></div>";
			// $page_break = "";
		}else{
			$page_break = "";
		}
        $tpl1=
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
                    font-family: "Arial Narrow", "Arial Narrow", cursive;
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
				
                <p class="spstyle_p">Jakarta, <b>'.$tgl_print.'</b></p>
                <p class="spstyle_p">No	: <b>'.$no_sp.'</b><br/>
                    Hal	: <b><u>Surat  Pemberitahuan {{sp_surat_ke}}</b></u> </p> 

                <p class="spstyle_p" style="width: 400px;">Kepada Yth, <br>
                    Bapak/Ibu <b>{{customer_name}}</b><br>
                    {{customer_address}}</p>

                <p class="spstyle_p">Dengan Hormat,<br>
                <div class="amiddle">';
            
            $tpl2 = 
                '<p style="text-align: justify;">Menindaklanjuti <b>Surat Pemberitahuan 1</b> kami tanggal {{tgl_sp1}} No.{{sp1}}. Melalui surat ini kami beritahukan kepada Bapak/Ibu selaku pemesan Unit Apartemen CitraPlaza Nagoya yang terletak di Lantai/No <b>{{unit_number}} {{cluster}}</b> , bahwa berdasarkan catatan kami, angsuran Unit Apartemen Bapak/Ibu telah jatuh tempo sebesar (dalam rupiah) :</p>        
                        <br/></p>';

            $tpl3 = 
                '<p style="text-align: justify;">Melalui surat ini kami informasikan kepada Bapak/Ibu <b>{{customer_name}}</b> selaku pembeli unit apartemen Lantai <b>{{unit_number}} {{cluster}}</b>, bahwa berdasarkan catatan kami Bapak/Ibu <b>{{customer_name}}</b> sampai dengan tanggal <b>'.$tgl_print.'</b> belum melaksanakan pembayaran atas angsuran dan denda yang telah jatuh tempo. Atas hal tersebut, total tunggakan yang harus diselesaikan menjadi sebagai berikut (dalam rupiah):
                        </p>        
                        ';
						
			$tpl4 = 
                'Berdasarkan <b>Surat Pemberitahuan 2</b> kami tanggal {{tgl_sp2}} No.{{sp2}}, melalui surat ini kami beritahukan kepada Bapak/Ibu selaku pemesan Unit Apartemen CitraPlaza Nagoya yang terletak di Lantai/No <b>{{unit_number}} {{cluster}}</b>, bahwa berdasarkan catatan kami, angsuran Unit Apartemen Bapak/Ibu telah jatuh tempo sebesar (dalam rupiah) :</p>        
                        <br/>';
			
			$tpl5 ='<p style="text-align: justify;">Menindaklanjuti <b>Surat Pemberitahuan 3</b> kami tanggal {{tgl_sp3}} No.{{sp3}}, melalui ini kami beritahukan kepada Bapak/Ibu selaku pembeli unit <b>{{unit_number}} {{cluster}}</b> , cluster {{cluster}},bahwa pemesanan rumah tersebut menjadi <b>batal.</b>
			<br/><br/>
			<b>Keseluruhan uang</b> yang telah Bapak /Ibu bayarkan <b>tidak</b> dapat <b>dikembalikan.</b> Dengan demikian kami <b>berhak</b> menjual kembali rumah tersebut kepada pihak lain.
			<br/>
			'.$page_break.'
			<br/><br/>Demikian hal ini kami sampaikan. Atas perhatian dan kerjasamanya, kami ucapkan terima kasih.</style>';
			
			$tpl6 ='<br/>
			<table width=100% clas="table">
				<tbody align="center">
				<tr style="background-color: #e8e9ea;font-weight: bold;">
				<!--<td>Tagihan</td>
					<td>Termin</td>-->
					<td>Tunggakan Bulan</td>
					<td>Cicilan Pokok (Rp)</td>
					<!--<td>Keterlambatan (hari) </td>
					<td>Nomor SP - Tanggal SP</td>-->
					<td>Denda Keterlambatan <br>( s/d {{max_date_w}} ) (Rp)</td>
					<td>Total Dibayar <br>( s/d {{max_date_w}} ) (Rp)</td>
                </tr> 
                {{{list_tagihan}}}
                </tbody></table>
				<b>Denda keterlambatan diatas akan berubah sampai dengan pembayaran dan dihitung sejak tgl. terhutang. </b>
                <br/>
				
			{{{pageBreak3}}}   
			
            <p class="spstyle_p" >
			<p style="text-align: justify;">
						Sehubungan dengan hal diatas, mohon Bapak/Ibu dapat segera melakukan pembayaran paling lambat pada tanggal {{max_date_w}} dengan cara transfer ke virtual account mandiri atas nama : </p><b>CITRAPLAZA NAGOYA a/c. '.$data['va_mandiri'].' </b><br>Bukti transfer mohon :
                <br>        
				&nbsp;&nbsp;&nbsp;a. Diinfokan melalui wa ke <b>081381070933 Up. Hangga.</b><br/>
				&nbsp;&nbsp;&nbsp;b. Dapat ditukar dengan kwitansi asli CitraPlaza Nagoya Batam 14 hari setelah pembayaran di<br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Marketing Gallery, Nagoya Citywalk Blok Northwalk A No.01, Batam.
				
				<p>Untuk tindak lanjut penyelesaian dapat menghubungi petugas collection kami, sdra. <b>Hangga</b> di no. telp. <b>021-6198177 ext. 742.</b></p></p>
							';
			
			$tpl7 ='<p style="text-align: justify;">Kami memberikan waktu sampai dengan tanggal <b>{{max_date_w}}</b> untuk penyelesaian pembayaran tunggakan diatas. Bapak/Ibu dapat menghubungi petugas Collection kami, sdri. <b>Ervinna</b> di no. telp. <b>6198177 ext. 712</b>
					<br/>
			'.$page_break.'
            Demikian hal ini kami sampaikan, atas perhatian dan kerjasama yang baik dari Bapak/Ibu kami ucapkan terima kasih. </p>';
			
			$tpl8 = '<br/>
			'.$page_break.'
			<br/>Demikian hal ini kami sampaikan, atas perhatian dan kerjasama yang baik dari Bapak/Ibu kami ucapkan terima kasih. ';
			
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
                <p class="spstyle_p">Jakarta, <b>'.$tgl_print.'</b></p>
                <p class="spstyle_p">No. Ref : <b>{{nomor_sp_teratas}}</b><br/>
                    Hal : <b><u>Surat  Pembatalan</b></u> </p> 

                <p class="spstyle_p" style="width: 310px;">Kepada Yth, <br/>
                    Bapak/Ibu <b>{{customer_name}}</b><br/>
                    {{customer_address}}</p>

                <p class="spstyle_p">Dengan Hormat,<br/>
                <div class="amiddle">'; 
			
			$tpl10 = '<p style="text-align: justify;">Apabila lewat dari tanggal tersebut diatas Bapak/Ibu masih belum melunasinya, maka dengan sangat menyesal kami menganggap Bapak/Ibu membatalkan <b>pemesanan unit apartemen tersebut</b>. Keseluruhan uang yang telah Bapak/Ibu bayarkan <b>tidak dapat dikembalikan</b>. Dengan demikian kami <b>berhak menjual kembali unit apartemen</b> tersebut kepada pihak lain.
					
					<br/>
			'.$page_break.'
            <br/><br/>Demikian hal ini kami sampaikan, atas perhatian dan kerjasama yang baik dari Bapak/Ibu kami ucapkan terima kasih.</p>'; 
			
            $tpl11 .= '</div>
                <!--<br/>--><br/>
                <p class="spstyle_p">
                Hormat Kami,</br>
				<b>PT. CITRA SERAYA SUPREMNUSA</b></br>
                <br/>
                <br/>
                <br/>
                <br/>
                <b><u>	SINTHIA ADRYANTO</u></b><br/>
				<!-- --------------------------------------<br/> -->
				Finance Manager
				<!--{{salesman_name}} (Sales)<br/>-->
				<br/>
                CC&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: - Direktur Proyek <br>
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Legal
                </p>

                <p class="spstyle_p_small" style="text-align: justify;"><b>Note</b> : <i>Apabila pada saat surat ini diterima Bapak/Ibu telah melakukan transfer ke rekening kami, mohon untuk segera menghubungi kami, sehingga kami dapat melakukan pengecekan lebih lanjut.</i></p>
                </body>
                ';
				
			$tpl12 .= '</div>
                <!--<br/>--><br/>
                <p class="spstyle_p">
                Hormat Kami,</br>
				<b>PT. CITRA SERAYA SUPREMNUSA</b></br>
                <br/>
                <br/>
                <br/>
                <br/>
                <b><u>	AGUS SUPARLAN</u></b><br/>
				<!-- --------------------------------------<br/> -->
				General Manager
				<!--{{salesman_name}} (Sales)<br/>-->
				<br/>
                CC&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: - Direktur Proyek <br>
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Legal
                </p>

                <p class="spstyle_p_small" style="text-align: justify;"><b>Note</b> : <i>Apabila pada saat surat ini diterima Bapak/Ibu telah melakukan transfer ke rekening kami, mohon untuk segera menghubungi kami, sehingga kami dapat melakukan pengecekan lebih lanjut.</i></p>
                </body>
                ';
        if($spke==1){
            $tpl = $tpl1.$tpl3.$tpl6.$tpl8.$tpl11;
        }
        elseif($spke==2){
            $tpl = $tpl1.$tpl2.$tpl6.$tpl8.$tpl11;
        }
        elseif($spke==3){
            $tpl = $tpl1.$tpl4.$tpl6.$tpl10.$tpl11;
        }
        elseif($spke==4){
            $tpl = $tpl9.$tpl5.$tpl12;
        }else{
            $tpl = $tpl1.$tpl3.$tpl6.$tpl7.$tpl11;
        }
        
        return $word.'<div id="exportContent">'.$tpl.'</div>';
    }
}
