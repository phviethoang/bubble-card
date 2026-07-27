// =====================================================================
//  DỮ LIỆU LỜI NHẮN — Đây là file DUY NHẤT bạn cần sửa.
//
//  1) CONFIG: tên cô, câu đề tặng, lời cảm ơn màn kết...
//  2) LETTERS: mỗi sinh viên là một { name, text }.
//        name : tên hiển thị trên bong bóng.
//               Để "" (chuỗi rỗng) hoặc null  ->  bong bóng ghi "Ẩn danh".
//        text : nội dung tâm thư. Xuống dòng bằng Enter;
//               để MỘT DÒNG TRỐNG giữa hai đoạn để tách đoạn.
//
//  Số bong bóng = số phần tử trong LETTERS. Thêm/bớt tùy ý.
//  Mẹo: dán nội dung giữa hai dấu backtick `...` để giữ nguyên xuống dòng.
// =====================================================================

export const CONFIG = {
  teacher: 'Nguyễn Thị Thu Trang',
  pageTitle: 'Gửi cô Nguyễn Thị Thu Trang',
  eyebrow: 'LỜI TRI ÂN',
  greetingTitle: 'Gửi cô\nNguyễn Thị Thu Trang',
  greetingSubtitle:
    'Những lời nhắn nhỏ từ 20 đứa học trò của lab — gửi tới cô, ' +
    'người đã đồng hành cùng chúng em suốt chặng đường đồ án tốt nghiệp.',
  openButton: 'Mở những lời nhắn 💌',
  finaleTitle: 'Cảm ơn cô ạ! 💛',
  finaleMessage:
    'Cô đã đọc hết những lời nhắn của chúng em rồi đó ạ. Cảm ơn cô vì tất cả ' +
    'sự tận tâm, kiên nhẫn và tin tưởng cô đã dành cho chúng em. Kính chúc cô ' +
    'thật nhiều sức khỏe, niềm vui và luôn rực rỡ như hôm nay!',
};

export const LETTERS = [
  {
    name: 'Minh Anh',
    text: `Gửi cô,

Em vẫn nhớ buổi đầu bước vào lab, em lo lắng đến mức không dám hỏi gì. Cô là người đầu tiên bảo em rằng "sai cũng không sao, quan trọng là mình hiểu vì sao sai". Câu nói đó theo em suốt cả đồ án.

Cảm ơn cô vì đã kiên nhẫn với một đứa hay hoảng như em. Em thương cô nhiều lắm ạ!`,
  },
  {
    name: 'Quốc Huy',
    text: `Cô ơi, em cảm ơn cô vì những lần cô ngồi lại đến tối muộn chỉ để nghe tụi em trình bày cho xong ý tưởng. Em biết cô bận, nhưng cô chưa bao giờ để tụi em cảm thấy mình là gánh nặng. Chúc cô luôn mạnh khỏe ạ.`,
  },
  {
    name: '',
    text: `Có những lời em không đủ can đảm nói trực tiếp, nên em xin gửi vào đây.

Cảm ơn cô vì đã nhìn thấy ở em một điều gì đó mà chính em còn chưa tin. Nhờ cô mà em dám chọn hướng đi này. Em sẽ cố gắng để cô tự hào.`,
  },
  {
    name: 'Thảo Vy',
    text: `Cô là cô giáo hiếm hoi vừa nghiêm khắc lại vừa ấm áp. Mỗi lần cô gạch đỏ cả trang báo cáo em hơi tủi, nhưng rồi em nhận ra cô làm vậy vì muốn tụi em thật sự giỏi. Cảm ơn cô đã không hạ tiêu chuẩn xuống cho tụi em ạ.`,
  },
  {
    name: 'Đức Anh',
    text: `Em cảm ơn cô! Không có cô chắc nhóm em nộp muộn deadline mất rồi 😅. Cô đúng là "phao cứu sinh" của cả lab. Chúc cô vui vẻ và ngày càng xinh ạ.`,
  },
  {
    name: 'Hương Giang',
    text: `Cô ơi,

Em muốn cảm ơn cô vì một điều rất nhỏ mà em nhớ mãi: hôm em báo tin nhà có chuyện, cô không hỏi gì nhiều, chỉ bảo "việc học để đó, về lo cho gia đình đi con". Lúc đó em đã bật khóc.

Cô không chỉ dạy em kiến thức, cô còn dạy em cách làm người tử tế. Em biết ơn cô rất nhiều.`,
  },
  {
    name: 'Tuấn Kiệt',
    text: `Bốn năm đại học, người thầy em nể nhất là cô. Cô làm việc kỹ đến từng chi tiết, nhưng chưa bao giờ áp đặt. Cô để tụi em tự vấp, tự đứng dậy, rồi mới nhẹ nhàng chỉ đường. Em học được ở cô cách làm khoa học tử tế và trung thực. Cảm ơn cô ạ!`,
  },
  {
    name: 'Ngọc Ánh',
    text: `Em cảm ơn cô vì đã luôn tin tưởng giao cho em những phần khó nhất. Ban đầu em sợ, nhưng chính niềm tin của cô đã đẩy em đi xa hơn em nghĩ. Mong cô luôn giữ được nụ cười ạ.`,
  },
  {
    name: 'Bá Long',
    text: `Cô là người hướng dẫn, nhưng nhiều lúc em thấy cô như một người chị lớn trong lab. Cảm ơn cô đã lắng nghe cả những chuyện ngoài chuyện học. Chúc cô mọi điều tốt lành nhất ạ.`,
  },
  {
    name: 'Phương Linh',
    text: `Gửi cô của em,

Em nhớ những buổi seminar cô bắt cả nhóm phải phản biện lẫn nhau. Hồi đó em ghét lắm vì mệt, nhưng giờ đi làm em mới thấy đó là món quà quý nhất cô cho tụi em — biết đặt câu hỏi và không sợ nói ra suy nghĩ của mình.

Cảm ơn cô đã rèn tụi em nên người. Em thương cô!`,
  },
  {
    name: 'Gia Bảo',
    text: `Cảm ơn cô vì đã không bỏ cuộc với em kể cả khi em suýt bỏ cuộc với chính mình. Đồ án này có tên em, nhưng một nửa công lao là của cô. Em kính chúc cô sức khỏe ạ.`,
  },
  {
    name: 'Khánh Huyền',
    text: `Cô ơi, em xin lỗi vì nhiều lần làm cô phải nhắc đi nhắc lại. Và em cảm ơn cô vì chưa bao giờ vì thế mà nản lòng với em. Cô kiên nhẫn hơn cả những gì em xứng đáng được nhận. Em biết ơn cô rất nhiều.`,
  },
  {
    name: 'Trọng Nghĩa',
    text: `Điều em quý nhất ở cô là cô luôn công bằng. Ai cố gắng, cô ghi nhận; ai lơ là, cô nhắc thẳng nhưng không làm ai mất mặt. Nhờ cô mà lab mình lúc nào cũng ấm. Chúc cô luôn vui ạ!`,
  },
  {
    name: 'Mai Chi',
    text: `Em cảm ơn cô vì những tin nhắn động viên lúc nửa đêm mùa bảo vệ. Chỉ một câu "cố lên, sắp xong rồi" của cô thôi mà tụi em có thêm sức làm tới sáng. Cô là điểm tựa của cả nhóm. Thương cô nhiều ạ.`,
  },
  {
    name: 'Việt Hoàng',
    text: `Gửi cô,

Ngày đầu vào lab em chỉ nghĩ sẽ làm cho xong cái đồ án để ra trường. Cô là người khiến em nhận ra mình thật sự thích nghiên cứu. Cô cho em thấy một vấn đề khó có thể trở nên thú vị đến mức nào khi mình đủ tò mò.

Cảm ơn cô vì đã thắp cho em ngọn lửa đó. Em sẽ mang nó đi thật xa.`,
  },
  {
    name: 'Diễm Quỳnh',
    text: `Cô là người phụ nữ giỏi giang mà em ngưỡng mộ. Nhìn cách cô cân bằng giữa công việc và sự dịu dàng, em học được rằng mình hoàn toàn có thể vừa mạnh mẽ vừa tử tế. Cảm ơn cô đã là hình mẫu của em ạ.`,
  },
  {
    name: 'Anh Tú',
    text: `Cảm ơn cô đã dạy em rằng làm gì cũng phải làm cho tới. Cái thói quen "đọc kỹ hơn một chút, kiểm tra lại một lần nữa" cô rèn cho em, giờ thành phản xạ trong công việc rồi. Chúc cô vạn sự như ý ạ.`,
  },
  {
    name: '',
    text: `Em là đứa ít nói nhất lab nên chắc cô không để ý em nhiều. Nhưng em để ý cô rất nhiều: cách cô luôn đến sớm, cách cô nhớ tên từng người, cách cô chưa bao giờ để ai bị bỏ lại phía sau.

Cảm ơn cô. Được là học trò của cô là điều may mắn của em.`,
  },
  {
    name: 'Hoàng Yến',
    text: `Cô ơi, cảm ơn cô vì đã tin rằng tụi con gái trong lab làm được những việc khó chẳng kém ai. Cô không bao giờ nói điều đó thành lời, cô chứng minh bằng cách giao việc và tin tưởng. Điều đó với em có ý nghĩa vô cùng. Kính chúc cô luôn hạnh phúc ạ.`,
  },
  {
    name: 'Nam Phong',
    text: `Chặng đường đồ án đã khép lại, nhưng những gì cô dạy thì còn mãi. Thay mặt cả nhóm 20 đứa, em xin gửi tới cô lời cảm ơn chân thành nhất. Chúc cô mãi khỏe mạnh, bình an và gặp thật nhiều niềm vui trong cuộc sống. Tụi em sẽ luôn nhớ về cô. 💛`,
  },
];
