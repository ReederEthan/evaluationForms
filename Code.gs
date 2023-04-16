//Author: Ethan Reeder 
//This is the code to create and email the evaluation forms to the first 6 schools in Koga city(total of 10 teachers). This app requires permission to use you gmail so I suggest running the triggerDeleter.gs code before running this so you can allow the required permissions safely. After running this code please refrain from running the triggerDeleter.gs or any code within this script as it will prevent the ability to see the form responses.
//When ready to go live please swap the spreadsheetIds for the ones within the comments on lines 8 and 570. Also change the notification email address at line 566. 

//read the spreadsheet to get data for personal evaluation form creation

function evaluationForm() {
  var spreadsheetId = '16K-ia0WIA05mnK3C2M_t8MWVsYtxpjavg23st6WnVfE'; //When ready to go live change the Id to XXXXXXX
  var rangeName = 'A2:E7'; //This grabs the teachers associated to the first 6 schools in the database.
  var values = Sheets.Spreadsheets.Values.get(spreadsheetId, rangeName).values;
  if (!values) {
    Logger.log('No data found.');
  } else {
    Logger.log('Email, School, Teachers:');
    //This will check if there is a teacher listed for the school and if there is will create the form for them.
    for (var row = 0; row < values.length; row++) {
      //This checks if there is a teacher listed in the teacher name section
      if(values[row][2] != null){ 
        Logger.log(' - %s, %s, %s', values[row][0], values[row][1], values[row][2]);
        // create & name Form  
        var item = values[row][1] + "の" + values[row][2] + "の評価について";  
        Logger.log(item);
        var form = FormApp.create(item)  
          .setTitle(item); 
        form.setDescription("ALTの勤務状況について以下の項目についてご回答いただけますようよろしくお願い申し上げます。\n以下が点数と表記の基準となっておりますのでこちらよりご回答いただければ幸いです。\nまた、弊社は、普通という曖昧表記を避けるため「どちらかというと」という表記を加えております。 \n\n６：非常に優れている　５：優れている　４：どちらかというと優れている　３：どちらかというと劣る \n２：劣る　１：非常に劣る");

        item = "記入者氏名";  
        form.addTextItem()
          .setRequired(true)  
          .setTitle(item);

        item = "役職";  
        form.addTextItem()
         .setRequired(true)  
         .setTitle(item);
           
        // Create first section of form 
        item = form.addSectionHeaderItem();
          item.setTitle('人間性に関して');

        // create scale questions for 人間性に関して section
        item = form.addScaleItem();
         item.setTitle('1.児童生徒に積極的に関わろうとしている')
            .setRequired(true)
            .setBounds(1, 6);

        item = form.addScaleItem();
          item.setTitle('2.児童生徒に親しまれている')
            .setRequired(true)
            .setBounds(1, 6);

        item = form.addScaleItem();
          item.setTitle('3.協調性・協力性がある')
            .setRequired(true)
           .setBounds(1, 6);

        item = form.addScaleItem();
          item.setTitle('4.柔軟に業務を遂行している')
            .setRequired(true)
            .setBounds(1, 6);

        item = form.addScaleItem();
          item.setTitle('5.教えていることに対して熱心な態度がみられる')
            .setRequired(true)
            .setBounds(1, 6);

        item = form.addScaleItem();
          item.setTitle('6.日本文化に適応しようとし、まじめに業務に取り組んでいる')
            .setRequired(true)
            .setBounds(1, 6);
    
        item = form.addScaleItem();
          item.setTitle('7.外国語活動以外の時間にも積極的に関わっている')
            .setRequired(true)
            .setBounds(1, 6);
    
        // Create second section of form
        item = form.addSectionHeaderItem();
          item.setTitle('指導に関して');

       // Create scale questions for 指導に関して section
        item = form.addScaleItem();
          item.setTitle('8.指導に関して研究と理解がなされている')
            .setRequired(true)
            .setBounds(1, 6);
  
        item = form.addScaleItem();
          item.setTitle('9.状況に合わせて積極的にアイディアを出している')
          .setRequired(true)
          .setBounds(1, 6);
  
        item = form.addScaleItem();
          item.setTitle('10.教材研究、事前準備を熱心に取り組んでいる')
            .setRequired(true)
            .setBounds(1, 6);
  
          item = form.addScaleItem();
            item.setTitle('11.児童生徒が興味を持つ授業を実践している')
              .setRequired(true)
              .setBounds(1, 6);
  
          item = form.addScaleItem();
            item.setTitle('12.児童生徒に分かりやすい授業を行っている')
              .setRequired(true)
              .setBounds(1, 6);
  
          item = form.addScaleItem();
            item.setTitle('13.授業改善に努めている')
              .setRequired(true)
              .setBounds(1, 6);
  
          item = form.addScaleItem();
            item.setTitle('14.児童生徒の自発性を高めるために、授業を工夫している')
              .setRequired(true)
              .setBounds(1, 6);
  
          // Create third section of form
          item = form.addSectionHeaderItem();
            item.setTitle('日本語能力');

          // Create radio question for 日本語能力 section

          item = "日本語能力";  
         var choices = ["指導に求められている日本語でのコミュニケーション能力が非常に優れている。", " 指導に求められている日本語でのコミュニケーション能力が優れている ", " 指導に求められている日本語でのコミュニケーションをとることができる。 ", " 日常会話については日本語でコミュニケーションをとることができる。 ", " 会話まではできないがコミュニケーションをとることができる。 ", " コミュニケーションをとることができない。"];  
          form.addMultipleChoiceItem()  
            .setTitle(item)  
            .setChoiceValues(choices)  
            .setRequired(true);  

         // Create final section of form
          item = form.addSectionHeaderItem();
            item.setTitle('日本への関心度')
              .setHelpText('１．消極的　２．普通　３．積極的　の中から選択してください。');

          // Create linear scale questions for 日本および習慣への理解 section
          item = form.addScaleItem();
            item.setTitle('1.日本および習慣への理解')
              .setRequired(true)
              .setBounds(1, 3);
  
          item = form.addScaleItem();
            item.setTitle('2.児童生徒や教職員との交流状況')
              .setRequired(true)
              .setBounds(1, 3);
  
          item = form.addScaleItem();
            item.setTitle('3.日本の生活における順応性')
              .setRequired(true)
              .setBounds(1, 3);

          item = "ALTに関する総合所見　　　　　　　　　　　　　　　　※ご要望等を是非お聞かせ下さい。";  
          form.addTextItem()  
            .setTitle(item)
            .setHelpText('今後の弊社ALT管理システム、ALT研修、人材採用の改善に役立させて頂きます。');
    
          item = form.addSectionHeaderItem();
            item.setTitle('ALTに関するアンケート記入誠にありがとうございました。引き続き児童生徒へより良い授業提供に向けて尽力して参りますので今後ともよろしくお願いいたします'); 

          form.setShowLinkToRespondAgain(false);

          Logger.log(`Google form has been created.`);

          ScriptApp.newTrigger('respondToFormSubmit').forForm(form).onFormSubmit().create();

          //This will create and send the email to the listed email address
          GmailApp.sendEmail(values[row][0], `株式会社ジョイトークALTの勤務に関するアンケートの実施について`, ` 校長先生　

いつも大変お世話になっております。
            
お忙しい中、大変恐縮ではございますが、標題の件についてご協力いただきたくお願い申し上げます。

アンケート内容は、人間性、指導面、日本語能力、日本に対する関心度についてのアンケートとなります。先生方からの率直な現場のご意見を取り入れ、よりお力となれるよう、ALTの指導や研修に反映したいと考えております。

授業回数が少ないなど、評価の難しい項目については、可能な範囲でご協力いただければ幸いです。

なお、評価結果につきましては、最下部記載のURLをクリックいただき、評価頂ければ幸いです。約3～5分で完了致します。

注意：
一度提出されますと変更ができませんのでご注意ください。変更が必要な場合は、以下のメールアドレスに変更の依頼を頂けると若干日数は掛かる場合がございますが、変更が1回可能になります。また、再度変更が必要な場合は、再度ご連絡いただくようになりますのでご注意ください。

変更依頼先メールアドレス：　alt@joytalk.co.jp

大変短い期間となっておりますが、以下の期間にアンケートのご回答をいただければ幸いです。

回答期日：　2021年7月16日(金)迄

お忙しいところ恐縮ですが、ご協力をお願いいたします。何かご不明な点等ありましたら、お気軽にお問い合わせください。　

改善すべき内容がある場合は、速やかに弊社の担当STAFFが対応し、その結果をご報告させていただきます。

以下ＵＲＬよりご入力ください。
` + form.getPublishedUrl());


          Logger.log( values[row][1] + ` has been sent ` + values[row][2] + `\'s form url by email to ` + values[row][0] + `.`);
        }
      // This checks if there is a teacher listed in the secondary teacher section
      if(values[row][3] != null){
        Logger.log(' - %s, %s, %s', values[row][0], values[row][1], values[row][3]);
        // create & name Form  
        var item = values[row][1] + "の" + values[row][3] + "の評価について";  
        Logger.log(item);
        var form = FormApp.create(item)  
          .setTitle(item); 
        form.setDescription("ALTの勤務状況について以下の項目についてご回答いただけますようよろしくお願い申し上げます。\n以下が点数と表記の基準となっておりますのでこちらよりご回答いただければ幸いです。\nまた、弊社は、普通という曖昧表記を避けるため「どちらかというと」という表記を加えております。 \n\n６：非常に優れている　５：優れている　４：どちらかというと優れている　３：どちらかというと劣る \n２：劣る　１：非常に劣る");

        item = "記入者氏名";  
        form.addTextItem()
          .setRequired(true)  
          .setTitle(item);

        item = "役職";  
        form.addTextItem()
         .setRequired(true)  
         .setTitle(item);
           
        // Create first section of form 
        item = form.addSectionHeaderItem();
          item.setTitle('人間性に関して');

        // create scale questions for 人間性に関して section
        item = form.addScaleItem();
         item.setTitle('1.児童生徒に積極的に関わろうとしている')
            .setRequired(true)
            .setBounds(1, 6);

        item = form.addScaleItem();
          item.setTitle('2.児童生徒に親しまれている')
            .setRequired(true)
            .setBounds(1, 6);

        item = form.addScaleItem();
          item.setTitle('3.協調性・協力性がある')
            .setRequired(true)
           .setBounds(1, 6);

        item = form.addScaleItem();
          item.setTitle('4.柔軟に業務を遂行している')
            .setRequired(true)
            .setBounds(1, 6);

        item = form.addScaleItem();
          item.setTitle('5.教えていることに対して熱心な態度がみられる')
            .setRequired(true)
            .setBounds(1, 6);

        item = form.addScaleItem();
          item.setTitle('6.日本文化に適応しようとし、まじめに業務に取り組んでいる')
            .setRequired(true)
            .setBounds(1, 6);
    
        item = form.addScaleItem();
          item.setTitle('7.外国語活動以外の時間にも積極的に関わっている')
            .setRequired(true)
            .setBounds(1, 6);
    
        // Create second section of form
        item = form.addSectionHeaderItem();
          item.setTitle('指導に関して');

        // Create scale questions for 指導に関して section
        item = form.addScaleItem();
          item.setTitle('8.指導に関して研究と理解がなされている')
            .setRequired(true)
            .setBounds(1, 6);
  
        item = form.addScaleItem();
          item.setTitle('9.状況に合わせて積極的にアイディアを出している')
          .setRequired(true)
          .setBounds(1, 6);
  
        item = form.addScaleItem();
          item.setTitle('10.教材研究、事前準備を熱心に取り組んでいる')
            .setRequired(true)
            .setBounds(1, 6);
  
          item = form.addScaleItem();
            item.setTitle('11.児童生徒が興味を持つ授業を実践している')
              .setRequired(true)
              .setBounds(1, 6);
  
          item = form.addScaleItem();
            item.setTitle('12.児童生徒に分かりやすい授業を行っている')
              .setRequired(true)
              .setBounds(1, 6);
  
          item = form.addScaleItem();
            item.setTitle('13.授業改善に努めている')
              .setRequired(true)
              .setBounds(1, 6);
  
          item = form.addScaleItem();
            item.setTitle('14.児童生徒の自発性を高めるために、授業を工夫している')
              .setRequired(true)
              .setBounds(1, 6);
  
          // Create third section of form
          item = form.addSectionHeaderItem();
            item.setTitle('日本語能力');

          // Create radio question for 日本語能力 section

          item = "日本語能力";  
         var choices = ["指導に求められている日本語でのコミュニケーション能力が非常に優れている。", " 指導に求められている日本語でのコミュニケーション能力が優れている ", " 指導に求められている日本語でのコミュニケーションをとることができる。 ", " 日常会話については日本語でコミュニケーションをとることができる。 ", " 会話まではできないがコミュニケーションをとることができる。 ", " コミュニケーションをとることができない。"];  
          form.addMultipleChoiceItem()  
            .setTitle(item)  
            .setChoiceValues(choices)  
            .setRequired(true);  

         // Create final section of form
          item = form.addSectionHeaderItem();
            item.setTitle('日本への関心度')
              .setHelpText('１．消極的　２．普通　３．積極的　の中から選択してください。');

          // Create linear scale questions for 日本および習慣への理解 section
          item = form.addScaleItem();
            item.setTitle('1.日本および習慣への理解')
              .setRequired(true)
              .setBounds(1, 3);
  
          item = form.addScaleItem();
            item.setTitle('2.児童生徒や教職員との交流状況')
              .setRequired(true)
              .setBounds(1, 3);
  
          item = form.addScaleItem();
            item.setTitle('3.日本の生活における順応性')
              .setRequired(true)
              .setBounds(1, 3);

          item = "ALTに関する総合所見　　　　　　　　　　　　　　　　※ご要望等を是非お聞かせ下さい。";  
          form.addTextItem()  
            .setTitle(item)
            .setHelpText('今後の弊社ALT管理システム、ALT研修、人材採用の改善に役立させて頂きます。');
    
          item = form.addSectionHeaderItem();
            item.setTitle('ALTに関するアンケート記入誠にありがとうございました。引き続き児童生徒へより良い授業提供に向けて尽力して参りますので今後ともよろしくお願いいたします'); 

          form.setShowLinkToRespondAgain(false);

          Logger.log(`Google form has been created.`);

          ScriptApp.newTrigger('respondToFormSubmit').forForm(form).onFormSubmit().create();

          //This will create the email and send it to the listed email address
          GmailApp.sendEmail(values[row][0], `株式会社ジョイトークALTの勤務に関するアンケートの実施について`, ` 校長先生　

いつも大変お世話になっております。
            
お忙しい中、大変恐縮ではございますが、標題の件についてご協力いただきたくお願い申し上げます。

アンケート内容は、人間性、指導面、日本語能力、日本に対する関心度についてのアンケートとなります。先生方からの率直な現場のご意見を取り入れ、よりお力となれるよう、ALTの指導や研修に反映したいと考えております。

授業回数が少ないなど、評価の難しい項目については、可能な範囲でご協力いただければ幸いです。

なお、評価結果につきましては、最下部記載のURLをクリックいただき、評価頂ければ幸いです。約3～5分で完了致します。

注意：
一度提出されますと変更ができませんのでご注意ください。変更が必要な場合は、以下のメールアドレスに変更の依頼を頂けると若干日数は掛かる場合がございますが、変更が1回可能になります。また、再度変更が必要な場合は、再度ご連絡いただくようになりますのでご注意ください。

変更依頼先メールアドレス：　alt@joytalk.co.jp

大変短い期間となっておりますが、以下の期間にアンケートのご回答をいただければ幸いです。

回答期日：　2021年7月16日(金)迄

お忙しいところ恐縮ですが、ご協力をお願いいたします。何かご不明な点等ありましたら、お気軽にお問い合わせください。　

改善すべき内容がある場合は、速やかに弊社の担当STAFFが対応し、その結果をご報告させていただきます。

以下ＵＲＬよりご入力ください。
` + form.getPublishedUrl());


          Logger.log( values[row][1] + ` has been sent ` + values[row][3] + `\'s form url by email to ` + values[row][0] + `.`);
        }
        //This checks if there is a teacher in the tertiary teacher section
      if(values[row][4] != null){
         Logger.log(' - %s, %s, %s', values[row][0], values[row][1], values[row][4]);
        // create & name Form  
        var item = values[row][1] + "の" + values[row][4] + "の評価について";  
        Logger.log(item);
        var form = FormApp.create(item)  
          .setTitle(item); 
        form.setDescription("ALTの勤務状況について以下の項目についてご回答いただけますようよろしくお願い申し上げます。\n以下が点数と表記の基準となっておりますのでこちらよりご回答いただければ幸いです。\nまた、弊社は、普通という曖昧表記を避けるため「どちらかというと」という表記を加えております。 \n\n６：非常に優れている　５：優れている　４：どちらかというと優れている　３：どちらかというと劣る \n２：劣る　１：非常に劣る");

        item = "記入者氏名";  
        form.addTextItem()
          .setRequired(true)  
          .setTitle(item);

        item = "役職";  
        form.addTextItem()
         .setRequired(true)  
         .setTitle(item);
           
        // Create first section of form 
        item = form.addSectionHeaderItem();
          item.setTitle('人間性に関して');

        // create scale questions for 人間性に関して section
        item = form.addScaleItem();
         item.setTitle('1.児童生徒に積極的に関わろうとしている')
            .setRequired(true)
            .setBounds(1, 6);

        item = form.addScaleItem();
          item.setTitle('2.児童生徒に親しまれている')
            .setRequired(true)
            .setBounds(1, 6);

        item = form.addScaleItem();
          item.setTitle('3.協調性・協力性がある')
            .setRequired(true)
           .setBounds(1, 6);

        item = form.addScaleItem();
          item.setTitle('4.柔軟に業務を遂行している')
            .setRequired(true)
            .setBounds(1, 6);

        item = form.addScaleItem();
          item.setTitle('5.教えていることに対して熱心な態度がみられる')
            .setRequired(true)
            .setBounds(1, 6);

        item = form.addScaleItem();
          item.setTitle('6.日本文化に適応しようとし、まじめに業務に取り組んでいる')
            .setRequired(true)
            .setBounds(1, 6);
    
        item = form.addScaleItem();
          item.setTitle('7.外国語活動以外の時間にも積極的に関わっている')
            .setRequired(true)
            .setBounds(1, 6);
    
        // Create second section of form
        item = form.addSectionHeaderItem();
          item.setTitle('指導に関して');

       // Create scale questions for 指導に関して section
        item = form.addScaleItem();
          item.setTitle('8.指導に関して研究と理解がなされている')
            .setRequired(true)
            .setBounds(1, 6);
  
        item = form.addScaleItem();
          item.setTitle('9.状況に合わせて積極的にアイディアを出している')
          .setRequired(true)
          .setBounds(1, 6);
  
        item = form.addScaleItem();
          item.setTitle('10.教材研究、事前準備を熱心に取り組んでいる')
            .setRequired(true)
            .setBounds(1, 6);
  
        item = form.addScaleItem();
          item.setTitle('11.児童生徒が興味を持つ授業を実践している')
            .setRequired(true)
            .setBounds(1, 6);
  
        item = form.addScaleItem();
          item.setTitle('12.児童生徒に分かりやすい授業を行っている')
            .setRequired(true)
            .setBounds(1, 6);
  
        item = form.addScaleItem();
          item.setTitle('13.授業改善に努めている')
            .setRequired(true)
            .setBounds(1, 6);
  
        item = form.addScaleItem();
          item.setTitle('14.児童生徒の自発性を高めるために、授業を工夫している')
            .setRequired(true)
            .setBounds(1, 6);
  
        // Create third section of form
        item = form.addSectionHeaderItem();
          item.setTitle('日本語能力');

        // Create radio question for 日本語能力 section

        item = "日本語能力";  
        var choices = ["指導に求められている日本語でのコミュニケーション能力が非常に優れている。", " 指導に求められている日本語でのコミュニケーション能力が優れている ", " 指導に求められている日本語でのコミュニケーションをとることができる。 ", " 日常会話については日本語でコミュニケーションをとることができる。 ", " 会話まではできないがコミュニケーションをとることができる。 ", " コミュニケーションをとることができない。"];  
        form.addMultipleChoiceItem()  
          .setTitle(item)  
          .setChoiceValues(choices)  
          .setRequired(true);  

        // Create final section of form
        item = form.addSectionHeaderItem();
          item.setTitle('日本への関心度')
            .setHelpText('１．消極的　２．普通　３．積極的　の中から選択してください。');

        // Create linear scale questions for 日本および習慣への理解 section
        item = form.addScaleItem();
          item.setTitle('1.日本および習慣への理解')
            .setRequired(true)
            .setBounds(1, 3);
  
        item = form.addScaleItem();
          item.setTitle('2.児童生徒や教職員との交流状況')
            .setRequired(true)
            .setBounds(1, 3);
  
        item = form.addScaleItem();
          item.setTitle('3.日本の生活における順応性')
            .setRequired(true)
            .setBounds(1, 3);

        item = "ALTに関する総合所見　　　　　　　　　　　　　　　　※ご要望等を是非お聞かせ下さい。";  
          form.addTextItem()  
            .setTitle(item)
            .setHelpText('今後の弊社ALT管理システム、ALT研修、人材採用の改善に役立させて頂きます。');
    
        item = form.addSectionHeaderItem();
          item.setTitle('ALTに関するアンケート記入誠にありがとうございました。引き続き児童生徒へより良い授業提供に向けて尽力して参りますので今後ともよろしくお願いいたします'); 

        form.setShowLinkToRespondAgain(false);

        Logger.log(`Google form has been created.`);

        ScriptApp.newTrigger('respondToFormSubmit').forForm(form).onFormSubmit().create();


        GmailApp.sendEmail(values[row][0], `株式会社ジョイトークALTの勤務に関するアンケートの実施について`, ` 校長先生　

いつも大変お世話になっております。
            
お忙しい中、大変恐縮ではございますが、標題の件についてご協力いただきたくお願い申し上げます。

アンケート内容は、人間性、指導面、日本語能力、日本に対する関心度についてのアンケートとなります。先生方からの率直な現場のご意見を取り入れ、よりお力となれるよう、ALTの指導や研修に反映したいと考えております。

授業回数が少ないなど、評価の難しい項目については、可能な範囲でご協力いただければ幸いです。

なお、評価結果につきましては、最下部記載のURLをクリックいただき、評価頂ければ幸いです。約3～5分で完了致します。

注意：
一度提出されますと変更ができませんのでご注意ください。変更が必要な場合は、以下のメールアドレスに変更の依頼を頂けると若干日数は掛かる場合がございますが、変更が1回可能になります。また、再度変更が必要な場合は、再度ご連絡いただくようになりますのでご注意ください。

変更依頼先メールアドレス：　alt@joytalk.co.jp

大変短い期間となっておりますが、以下の期間にアンケートのご回答をいただければ幸いです。

回答期日：　2021年7月16日(金)迄

お忙しいところ恐縮ですが、ご協力をお願いいたします。何かご不明な点等ありましたら、お気軽にお問い合わせください。　

改善すべき内容がある場合は、速やかに弊社の担当STAFFが対応し、その結果をご報告させていただきます。

以下ＵＲＬよりご入力ください。
` + form.getPublishedUrl());


        Logger.log( values[row][1] + ` has been sent ` + values[row][4] + `\'s form url by email to ` + values[row][0] + `.`);
      }
    }
  }
}


//This is the response trigger that will be attached to each form and will store the values entered into the database
function respondToFormSubmit(e) {
  var form = e.source;
  //This will send a response submission notification to the listed email address notifying that the form has been filled out
  GmailApp.sendEmail("reedere2@sou.edu", form.getTitle() + " response submission notification.", "A response for " + form.getTitle() + " has been submitted. Please click on the below link or look at the database to view their response. " + form.getSummaryUrl());
    
    
  var split = form.getTitle().split("の"); 
  var spreadsheetId = 'XXXXXXXXX'; //When Ready to go live change this Id to xxxxxxx
  var rangeName = 'A2:E33'; //Class Data!A2:E

  var values = Sheets.Spreadsheets.Values.get(spreadsheetId, rangeName).values;
  for (var row = 0; row < values.length; row++) {
      if(values[row][1] == split[0]){
        if(values[row][2] == split[1]){
          var values = [["=HYPERLINK(\"" + form.getSummaryUrl() + "\", \"" + split[1] + " evaluation form link \")"]];
          var range = 'F' + (row+2);
          var valueRange = Sheets.newValueRange();
          valueRange.values = values;
          var result = Sheets.Spreadsheets.Values.update(valueRange, spreadsheetId, range, {
            valueInputOption: "USER_ENTERED"
          });
        } else if(values[row][3] == split[1]){
           var values = [["=HYPERLINK(\"" + form.getSummaryUrl() + "\", \"" + split[1] + " evaluation form link \")"]];
          var range = 'G' + (row+2);
          var valueRange = Sheets.newValueRange();
          valueRange.values = values;
          var result = Sheets.Spreadsheets.Values.update(valueRange, spreadsheetId, range, {
            valueInputOption: "USER_ENTERED"
          });
        } else if(values[row][4] == split[1]){
           var values = [["=HYPERLINK(\"" + form.getSummaryUrl() + "\", \"" + split[1] + " evaluation form link \")"]];
          var range = 'H' + (row+2);
          var valueRange = Sheets.newValueRange();
          valueRange.values = values;
          var result = Sheets.Spreadsheets.Values.update(valueRange, spreadsheetId, range, {
            valueInputOption: "USER_ENTERED"
          });
        }

      }
  }

  var spreadsheetId = 'XXXXXXXXXXXXX';
  var rangeName = 'A1:B21'; //The range of the 20 ALTs in Koga city
  var formResponses = form.getResponses();
  var responseList = formResponses[0].getItemResponses(); //Grabs the 19 answers within the form
  form.setPublishingSummary(true);
  form.setAcceptingResponses(false);

  var value = Sheets.Spreadsheets.Values.get(spreadsheetId, rangeName).values;
  //We will now grab the responses from each question and insert them into an array.
          var values = [[split[1], split[0]]];
          var range = 'A' + value.length;
          for (var j = 0; j < responseList.length; j++) {
            var itemResponse = responseList[j];
            values[0].push(itemResponse.getResponse());
          }
          var valueRange = Sheets.newRowData();
          valueRange.values = values;
          var appendRequest = Sheets.newAppendCellsRequest();
          appendRequest.sheetId = spreadsheetId;
          appendRequest.rows = [valueRange];
          var result = Sheets.Spreadsheets.Values.append(valueRange, spreadsheetId, range, {
            valueInputOption: "USER_ENTERED"
          });


}
