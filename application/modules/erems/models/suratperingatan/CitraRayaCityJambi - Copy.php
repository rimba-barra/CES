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
            $table .='<tr>
                        <!--<td>'.$row["scheduletype"].'</td>
                        <td>'.$row["termin"].'</td>-->
                        <td>'.$this->tgl_indo(date('Y-m-d',strtotime($row["duedate"]))).'</td>
						<td>'.$row["scheduletype"].' '.$row["termin"].'</td>
                        <td align="right">'.number_format($row["remaining_balance"]).'</td>
                        <!--<td>'.$row["hari_terlambatb"].'</td><td>'.$row["sp_no"].'</td>--> 
                        <td align="right">'.number_format($denda).'</td>
                        <td align="right">'.number_format($row["remaining_balance"]+$denda).'</td>
                    </tr>';
			// }
        }

        $table .='<tr><!--<td>&nbsp</td><td>&nbsp</td>--><td>Total </td><td></td><td align="right">'.number_format($ttlremaining_balance).'</td>
                <!--<td></td><td></td>--> <td align="right">'.number_format($ttldenda_terlambatb).'</td><td align="right">'.number_format($ttlremaining_balance+$ttldenda_terlambatb).'</td></tr>';

        return $table;
    }
	
	public function getHTMLdefault(){
       return $this->getHTML();
    }
    
	public function getHTML($spke=null,$data){
		$tgl_print = $this->tgl_indo(date('Y-m-d', strtotime("0 day"))); //default 0 day
		if($data['total_schedule'] > 0){
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
                    font-family: "Times New Roman", "Times New Roman", cursive;
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
				
                <p class="spstyle_p">Jambi, <b>'.$tgl_print.'</b></p>
                <p class="spstyle_p">No	: <b>{{nomor_sp_teratas}}</b><br/>
                    Hal	: <b><u>Surat  Pemberitahuan {{sp_surat_ke}}</b></u> </p> 

                <p class="spstyle_p" style="width: 400px;">Kepada Yth, <br>
                    Bapak/Ibu <b>{{customer_name}}</b><br>
                    {{customer_address}}</p>

                <p class="spstyle_p">Dengan Hormat,<br>
                <div class="amiddle">';
            
            $tpl2 = 
                'Menindaklanjuti <b>Surat Pemberitahuan 1</b> No.{{sp1}} tertanggal {{tgl_sp1}} , dengan ini kami beritahukan kepada Bapak/Ibu selaku pembeli Unit Rumah Blok <b>{{unit_number}} , {{cluster}}, CitraRaya City, Mendalo-Jambi, </b>bahwa berdasarkan catatan kami terdapat tunggakan atas pembayaran Rumah sebesar {{denda}} {{denda_terbilang}}, dengan rincian terlampir.</p>        
                        ';

            $tpl3 = 
                'Melalui surat ini kami beritahukan kepada Bapak/Ibu selaku pembeli Kavling/Rumah Blok <b>{{unit_number}} , {{cluster}}, CitraRaya City Mendalo-Jambi, </b>bahwa berdasarkan catatan kami terdapat tunggakan atas pembayaran Kavling/Rumah tersebut sebesar <b>{{denda}} {{denda_terbilang}}</b> ,dengan rincian terlampir.
                        </p>        
                        ';
						
			$tpl4 = 
                'Menindaklanjuti <b>Surat Pemberitahuan 2</b> No.{{sp2}}, tanggal {{tgl_sp2}} , bersama ini kami beritahukan kepada Bapak/Ibu selaku pembeli Unit Rumah Blok <b>{{unit_number}} , {{cluster}}, CitraRaya City, Mendalo-Jambi, </b>dan berdasarkan catatan kami, Bapak/Ibu sampai dengan tanggal {{max_date_w}} belum melaksanakan pembayaran angsuran yang telah jatuh tempo. Atas hal tersebut, total tunggakan yang harus diselesaikan menjadi {{denda}} {{denda_terbilang}}, rincian terlampir.</p>        
                        ';
			
			$tpl5 ='Menindaklanjuti <b>Surat Pemberitahuan 3</b> kami tanggal {{tgl_sp3}} No.{{sp3}}, melalui ini kami beritahukan kepada Bapak/Ibu selaku pembeli unit <b>{{unit_number}} - {{cluster}}</b> , cluster {{cluster}},bahwa pemesanan rumah tersebut menjadi <b>batal.</b>
			<br/><br/>
			<b>Keseluruhan uang</b> yang telah Bapak /Ibu bayarkan <b>tidak</b> dapat <b>dikembalikan.</b> Dengan demikian kami <b>berhak</b> menjual kembali rumah tersebut kepada pihak lain.
			<br/>
			'.$page_break.'
			<br/><br/>Demikian hal ini kami sampaikan. Atas perhatian dan kerjasamanya, kami ucapkan terima kasih.';
			
			$tpl6 ='
			'.$page_break.'
			<b><u>LAMPIRAN Tunggakan dan Denda</b></u><br/><br/>
			Nama&nbsp;&nbsp;&nbsp;: <b>{{customer_name}}</b><br/>
			Blok&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <b>{{unit_number}} - {{cluster}}, di Citra Raya City, Mendalo, Jambi<b/><br/><br/>
			<div align=right><i>(dalam rupiah)</i></div>
			<table width=100%>
				<tbody align="center">
				<tr style="background-color: #e8e9ea;font-weight: bold;">
				<!--<td>Tagihan</td>
					<td>Termin</td>-->
					<td>Tunggakan Bulan</td>
					<td>Keterangan</td>
					<td>Cicilan Pokok</td>
					<!--<td>Keterlambatan (hari) </td>
					<td>Nomor SP - Tanggal SP</td>-->
					<td>Denda Keterlambatan <br>( s/d {{max_date_w}} )</td>
					<td>Total Dibayar <br>( s/d {{max_date_w}} )</td>
                </tr> 
                {{{list_tagihan}}}
                </tbody></table><br/><br/>
				<p class="spstyle_p_small"><b>Note</b> :<br/><i>Denda Keterlambatan 0,1% Perhari Dari Setiap Angsuran.</i></p>
				';
			
			$tpl7 ='Kami memberikan waktu sampai dengan tanggal <b>{{max_date_w}}</b> untuk penyelesaian pembayaran tunggakan diatas. Bapak/Ibu dapat menghubungi petugas Collection kami, sdri. <b>Ervinna</b> di no. telp. <b>6198177 ext. 712</b>
					<br/>
			
            Demikian hal ini kami sampaikan, atas perhatian dan kerjasama yang baik dari Bapak/Ibu kami ucapkan terima kasih. ';
			
			$tpl8 = '
			<p class="spstyle_p">
				Sehubungan dengan hal di atas, mohon Bapak/Ibu dapat segera melakukan pembayaran dengan cara:
                        </p>
						&nbsp;&nbsp;&nbsp;a. Transfer ke: <b>CITRA MENDALO PRIMA KSO a/c. 8575.111.111 BCA Cab. Talang Banjar Jambi.</b> Mohon mencantumkan<br/>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;blok, No. ruko/rumah, dan nama pemesan pada kolom berita di slip transfer. Bukti transfer mohon <b>difax ke no.</b><br/>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>(0741) 5917878 Up. Robin/Adi</b> dan segera ditukar dengan kuitansi CitraRaya City, atau</b><br/>
						&nbsp;&nbsp;&nbsp;b. Membayar langsung ke kasir penerimaan City Management Office, Jl. Boulevard Raya Blok A.23 No. 01, CitraRaya City,<br/>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Mendalo-Jambi dengan uang tunai, bilyet giro  atau debit BCA.
				<p>Kami memberikan batas waktu kepada Bapak/Ibu untuk menyelesaikan pembayaran tersebut di atas sampai dengan tanggal <b>{{max_date_w}}</b></p>
				<p>Untuk informasi lebih lanjut, Bapak/Ibu dapat menghubungi petugas Collection kami, Saudara/i <b>Robin/Adi</b> di no. telepon <b>(0741) 7837477 / 085103068888.</b></p>
					Demikian hal ini kami sampaikan. Atas perhatian dan kerjasama yang baik dari Bapak/Ibu kami ucapkan terima kasih.
					';
			
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
			
			$tpl10 = '
			<br/> 
			<p class="spstyle_p">
				Sehubungan dengan hal di atas, mohon Bapak/Ibu dapat segera melakukan pembayaran dengan cara:
                        </p>
				<p>
						a.	Transfer ke: <b>CITRA MENDALO PRIMA KSO a/c. 8575.111.111 BCA Cab. Talang Banjar Jambi.</b> Mohon mencantumkan blok, No. ruko/rumah, dan nama pemesan pada kolom berita di slip transfer. Bukti transfer mohon <b>difax ke no. (0741) 5917878 Up. Robin/Adi</b> dan segera ditukar dengan kuitansi CitraRaya City, atau</b><br/>
						b.	Membayar langsung ke kasir penerimaan City Management Office, Jl. Boulevard Raya Blok A.23 No. 01, CitraRaya City, Mendalo-Jambi dengan uang tunai, bilyet giro  atau debit BCA.
				</p><br/>
				<p>Kami memberikan waktu sampai dengan tanggal <b>{{max_date_w}}</b> untuk penyelesaian pembayaran tunggakan diatas. Apabila sampai dengan tanggal tersebut diatas Bapak/Ibu masih belum melunasinya, maka kami mengganggap Bapak/Ibu membatalkan pemesanan Kavling/Rumah tersebut. <b>Keseluruhan uang</b> yang telah Bapak/Ibu bayarkan <b>tidak dapat dikembalikan.</b> Dengan demikian kami <b>berhak</b> menjual kembali rumah tersebut kepada pihak lain. Untuk tindak lanjut penyelesaian dapat menghubungi petugas Collection kami, Saudara/i <b>Robin/Adi</b> di no. telepon 085103068888 atau (0741) 580056.</p><br/>
					Demikian hal ini kami sampaikan. Atas perhatian dan kerjasama yang baik dari Bapak/Ibu kami ucapkan terima kasih.
					{{pageBreak3}}';
			
            $tpl11 .= '</div>
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
				F.A.T. Dept. Head
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
            $tpl = $tpl1.$tpl4.$tpl10.$tpl11.$tpl6;
        }
        elseif($spke==4){
            $tpl = $tpl9.$tpl5.$tpl11;
        }else{
            $tpl = $tpl1.$tpl3.$tpl6.$tpl7.$tpl11;
        }
        
        return $tpl;
    }
}
