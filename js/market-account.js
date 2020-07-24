const base_article = [
    "SubjectEvent是怎么回事呢？Subject相信大家都很熟悉，但是SubjectEvent是怎么回事呢，下面就让小编带大家一起了解吧。",
    "SubjectEvent，其实就是Statement，大家可能会很惊讶Subject怎么会Event呢？但事实就是这样，小编也感到非常惊讶。",
    "这就是关于SubjectEvent的事情了，大家有什么想法呢，欢迎在评论区告诉小编一起讨论哦！"
];
const default_in = [
    "营销号",
    "被扬了",
    "营销号的马没了"
];
const body_reg = [
    /Subject/ig,
    /Event/ig,
    /Statement/ig,
    /Think/ig,
    /Say/ig
];
const para_space = "　　";
const long_end = "总结的来说，SubjectEvent其实就是Statement， 大家可能会很惊讶Subject怎么会Event呢？但事实就是这样，小编也感到非常惊讶。"

var request = new XMLHttpRequest();
request.open("get", "../json/sayings.json"); /*设置请求方法与路径*/
request.send(null);
request.onload = function () {
    if (request.status == 200) {
        json = JSON.parse(request.responseText);
    }
}

var user_in = default_in;
var added = {
    sayings: [],
    bosh: [],
    think: [],
    say: []
};
var LC_multiplier = 214013;
var LC_addend = 2531011;
var LC_module = Math.pow(2, 32);
var rnd_seed = get_web_para("rnd_seed") || Math.floor(get_random(LC_module, Math.random));

function get_web_para(para) {
    return new URL(window.location.href).searchParams.get(para);
}

function LCG() {
    rnd_seed = (rnd_seed * LC_multiplier + LC_addend) % LC_module;
    return rnd_seed / LC_module;
};

function get_sentence(what) {
    var index = Math.floor(LCG() * json[what].length);
    return json[what][index];
}

function get_random(max_num = 100, rnd_fun = LCG) {
    var out_rnd = rnd_fun() * max_num;
    return parseInt(out_rnd);
}

function creat_short_article() {
    // 短文
    var short_result = new String();
    $(".res-box").css("width", "500px");

    for (var i = 0; i < base_article.length; ++i) {
        short_result += para_space + base_article[i] + (i == base_article.length - 1 ? "" : "<br />");
    }
    for (var i = 0; i < 3; ++i) {
        short_result = short_result.replace(body_reg[i], user_in[i]);
    }
    $("#article_res").html(short_result);
}

function creat_long_article() {
    // 长文
    $(".res-box").css("width", "auto");
    console.log(get_sentence("sayings"));

    var long_result = new String();
    var para = new String(para_space);
    long_result += "<p style=\"text-align: center; font-weight: bold; font-size: 35px;\">" + get_sentence("title") + "</p>";
    long_result += "<p style=\"line-height: 40px; font-size:25px\">" + para_space + base_article[0] + "<br />";
    while (long_result.length < 500) {
        var rnd = get_random(100);
        var last_sentence = "";
        if (rnd < 5 && para.length > 200) {
            long_result += para + "<br />";
            para = para_space;
            last_sentence = "para";
        } else if (rnd < 20) {
            para += get_sentence("sayings");
            last_sentence = "sayings";
        } else {
            para += get_sentence("bosh");
            last_sentence = "bosh";
        }
    }
    if (last_sentence == "bosh") {
        para += get_sentence("bosh_end");
    }
    long_result += para;
    long_result += long_end + base_article[2] + "</p>";
    for (var i = 0; i < 3; ++i) {
        long_result = long_result.replace(body_reg[i], user_in[i]);
    }
    long_result = long_result.replace(/think/ig, get_sentence("think"));
    long_result = long_result.replace(/say/ig, get_sentence("say"));
    $("#article_res").html(long_result);
}

$(document).ready(function () {
    creat_short_article();

    $("#article_run").click(function () {
        var have_blank = [false, false, false, false];
        var t_in = new Array(3);
        for (i in added) {
            added[i].length = 0;
        }
        if ($("#in_subject").val() == "") {
            have_blank[0] = true;
            have_blank[1] = true;
        } else {
            t_in[0] = $("#in_subject").val();
        }
        if ($("#in_event").val() == "") {
            have_blank[0] = true;
            have_blank[2] = true;
        } else {
            t_in[1] = $("#in_event").val();
        }
        if ($("#in_statement").val() == "") {
            have_blank[0] = true;
            have_blank[3] = true;
        } else {
            t_in[2] = $("#in_statement").val();
        }
        if (have_blank[0]) {
            if (have_blank[1]) {
                document.getElementById("alarm_1").style.visibility = "visible";
            }
            if (have_blank[2]) {
                document.getElementById("alarm_2").style.visibility = "visible";
            }
            if (have_blank[3]) {
                document.getElementById("alarm_3").style.visibility = "visible";
            }
        } else {
            user_in = t_in;
            document.getElementById("alarm_1").style.visibility = "hidden";
            document.getElementById("alarm_2").style.visibility = "hidden";
            document.getElementById("alarm_3").style.visibility = "hidden";
            if (document.getElementById("short_article").checked) {
                // 短文
                creat_short_article();
            } else if (document.getElementById("long_article").checked) {
                // 长文
                creat_long_article();
            } else {
                alert("Error");
            }
        }
    });
});

// const sayings = [
//     "爱迪生Say，天才是百分之一的勤奋加百分之九十九的汗水。Think",
//     "查尔斯·史Say，一个人几乎可以在任何他怀有无限热忱的事情上成功。Think",
//     "培根说过，深窥自己的心，而后发觉一切的奇迹在你自己。Think",
//     "歌德曾经Say，流水在碰到底处时才会释放活力。Think",
//     "莎士比亚Say，那脑袋里的智慧，就像打火石里的火花一样，不去打它是不肯出来的。Think",
//     "戴尔·卡耐基Say，多数人都拥有自己不了解的能力和机会，都有可能做到未曾梦想的事情。Think",
//     "白哲特Say，坚强的信念能赢得强者的心，并使他们变得更坚强。Think",
//     "伏尔泰Say, 不经巨大的困难，不会有伟大的事业。Think",
//     "富勒曾经Say, 苦难磨炼一些人，也毁灭另一些人。Think",
//     "文森特·皮尔Say, 改变你的想法，你就改变了自己的世界。Think",
//     "拿破仑·希尔Say, 不要等待，时机永远不会恰到好处。Think",
//     "塞涅卡Say, 生命如同寓言，其价值不在与长短，而在与内容。Think",
//     "奥普拉·温弗瑞Say, 你相信什么，你就成为什么样的人。Think",
//     "吕凯特Say, 生命不可能有两次，但许多人连一次也不善于度过。Think",
//     "莎士比亚Say, 人的一生是短的，但如果卑劣地过这一生，就太长了。Think",
//     "笛卡儿Say, 我的努力求学没有得到别的好处，只不过是愈来愈发觉自己的无知。Think",
//     "左拉Say, 生活的道路一旦选定，就要勇敢地走到底，决不回头。Think",
//     "米歇潘Say, 生命是一条艰险的峡谷，只有勇敢的人才能通过。Think",
//     "吉姆·罗恩Say, 要么你主宰生活，要么你被生活主宰。Think",
//     "日本谚语Say, 不幸可能成为通向幸福的桥梁。Think",
//     "海贝尔Say, 人生就是学校。在那里，与其说好的教师是幸福，不如说好的教师是不幸。Think",
//     "杰纳勒尔·乔治·S·巴顿Say, 接受挑战，就可以享受胜利的喜悦。Think",
//     "德谟克利特Say, 节制使快乐增加并使享受加强。Think",
//     "裴斯泰洛齐Say, 今天应做的事没有做，明天再早也是耽误了。Think",
//     "歌德Say, 决定一个人的一生，以及整个命运的，只是一瞬之间。Think",
//     "卡耐基Say, 一个不注意小事情的人，永远不会成就大事业。Think",
//     "卢梭Say, 浪费时间是一桩大罪过。Think",
//     "康德Say, 既然我已经踏上这条道路，那么，任何东西都不应妨碍我沿着这条路走下去。Think",
//     "克劳斯·莫瑟爵士Say, 教育需要花费钱，而无知也是一样。Think",
//     "伏尔泰Say, 坚持意志伟大的事业需要始终不渝的精神。Think",
//     "亚伯拉罕·林肯Say, 你活了多少岁不算什么，重要的是你是如何度过这些岁月的。Think",
//     "韩非Say, 内外相应，言行相称。Think",
//     "富兰克林Say, 你热爱生命吗？那么别浪费时间，因为时间是组成生命的材料。Think",
//     "马尔顿Say, 坚强的信心，能使平凡的人做出惊人的事业。Think",
//     "笛卡儿Say, 读一切好书，就是和许多高尚的人谈话。Think",
//     "塞涅卡Say, 真正的人生，只有在经过艰难卓绝的斗争之后才能实现。Think",
//     "易卜生Say, 伟大的事业，需要决心，能力，组织和责任感。Think",
//     "歌德Say, 没有人事先了解自己到底有多大的力量，直到他试过以后才知道。Think",
//     "达尔文Say, 敢于浪费哪怕一个钟头时间的人，说明他还不懂得珍惜生命的全部价值。Think",
//     "佚名Say, 感激每一个新的挑战，因为它会锻造你的意志和品格。Think",
//     "奥斯特洛夫斯基Say, 共同的事业，共同的斗争，可以使人们产生忍受一切的力量。　Think",
//     "苏轼Say, 古之立大事者，不惟有超世之才，亦必有坚忍不拔之志。Think",
//     "王阳明Say, 故立志者，为学之心也；为学者，立志之事也。Think",
//     "歌德Say, 读一本好书，就如同和一个高尚的人在交谈。Think",
//     "乌申斯基Say, 学习是劳动，是充满思想的劳动。Think",
//     "别林斯基Say, 好的书籍是最贵重的珍宝。Think",
//     "富兰克林Say, 读书是易事，思索是难事，但两者缺一，便全无用处。Think",
//     "鲁巴金Say, 读书是在别人思想的帮助下，建立起自己的思想。Think",
//     "培根Say, 合理安排时间，就等于节约时间。Think",
//     "屠格涅夫Say, 你想成为幸福的人吗？但愿你首先学会吃得起苦。Think",
//     "莎士比亚Say, 抛弃时间的人，时间也抛弃他。Think",
//     "叔本华Say, 普通人只想到如何度过时间，有才能的人设法利用时间。Think",
//     "博Say, 一次失败，只是证明我们成功的决心还够坚强。 维Think",
//     "拉罗什夫科Say, 取得成就时坚持不懈，要比遭到失败时顽强不屈更重要。Think",
//     "莎士比亚Say, 人的一生是短的，但如果卑劣地过这一生，就太长了。Think",
//     "俾斯麦Say, 失败是坚忍的最后考验。Think",
//     "池田大作Say, 不要回避苦恼和困难，挺起身来向它挑战，进而克服它。Think",
//     "莎士比亚Say, 那脑袋里的智慧，就像打火石里的火花一样，不去打它是不肯出来的。Think",
//     "希腊Say, 最困难的事情就是认识自己。Think",
//     "黑塞Say, 有勇气承担命运这才是英雄好汉。Think",
//     "非洲Say, 最灵繁的人也看不见自己的背脊。Think",
//     "培根Say, 阅读使人充实，会谈使人敏捷，写作使人精确。Think",
//     "斯宾诺莎Say, 最大的骄傲于最大的自卑都表示心灵的最软弱无力。Think",
//     "西班牙Say, 自知之明是最难得的知识。Think",
//     "塞内加Say, 勇气通往天堂，怯懦通往地狱。Think",
//     "赫尔普斯Say, 有时候读书是一种巧妙地避开思考的方法。Think",
//     "笛卡儿Say, 阅读一切好书如同和过去最杰出的人谈话。Think",
//     "邓拓Say, 越是没有本领的就越加自命不凡。Think",
//     "爱尔兰Say, 越是无能的人，越喜欢挑剔别人的错儿。Think",
//     "老子Say, 知人者智，自知者明。胜人者有力，自胜者强。Think",
//     "歌德Say, 意志坚强的人能把世界放在手中像泥块一样任意揉捏。Think",
//     "迈克尔·F·斯特利Say, 最具挑战性的挑战莫过于提升自我。Think",
//     "爱迪生Say, 失败也是我需要的，它和成功对我一样有价值。Think",
//     "罗素·贝克Say, 一个人即使已登上顶峰，也仍要自强不息。Think",
//     "马云Say, 最大的挑战和突破在于用人，而用人最大的突破在于信任人。Think",
//     "雷锋Say, 自己活着，就是为了使别人过得更美好。Think",
//     "布尔沃Say, 要掌握书，莫被书掌握；要为生而读，莫为读而生。Think",
//     "培根Say, 要知道对好事的称颂过于夸大，也会招来人们的反感轻蔑和嫉妒。Think",
//     "莫扎特Say, 谁和我一样用功，谁就会和我一样成功。Think",
//     "马克思Say, 一切节省，归根到底都归结为时间的节省。Think",
//     "莎士比亚Say, 意志命运往往背道而驰，决心到最后会全部推倒。Think",
//     "卡莱尔Say, 过去一切时代的精华尽在书中。Think",
//     "培根Say, 深窥自己的心，而后发觉一切的奇迹在你自己。Think",
//     "罗曼·罗兰Say, 只有把抱怨环境的心情，化为上进的力量，才是成功的保证。Think",
//     "孔子Say, 知之者不如好之者，好之者不如乐之者。Think",
//     "达·芬奇Say, 大胆和坚定的决心能够抵得上武器的精良。Think",
//     "叔本华Say, 意志是一个强壮的盲人，倚靠在明眼的跛子肩上。Think",
//     "黑格尔Say, 只有永远躺在泥坑里的人，才不会再掉进坑里。Think",
//     "普列姆昌德Say, 希望的灯一旦熄灭，生活刹那间变成了一片黑暗。Think",
//     "维龙Say, 要成功不需要什么特别的才能，只要把你能做的小事做得好就行了。Think",
//     "郭沫若Say, 形成天才的决定因素应该是勤奋。Think",
//     "洛克Say, 学到很多东西的诀窍，就是一下子不要学很多。Think",
//     "西班牙Say, 自己的鞋子，自己知道紧在哪里。Think",
//     "拉罗什福科Say, 我们唯一不会改正的缺点是软弱。Think",
//     "亚伯拉罕·林肯Say, 我这个人走得很慢，但是我从不后退。Think",
//     "美华纳Say, 勿问成功的秘诀为何，且尽全力做你应该做的事吧。Think",
//     "俾斯麦Say, 对于不屈不挠的人来说，没有失败这回事。Think",
//     "阿卜·日·法拉兹Say, 学问是异常珍贵的东西，从任何源泉吸收都不可耻。Think",
//     "白哲特Say, 坚强的信念能赢得强者的心，并使他们变得更坚强。 Think",
//     "查尔斯·史考伯Say, 一个人几乎可以在任何他怀有无限热忱的事情上成功。 Think",
//     "贝多芬Say, 卓越的人一大优点是：在不利与艰难的遭遇里百折不饶。Think",
//     "莎士比亚Say, 本来无望的事，大胆尝试，往往能成功。Think",
//     "卡耐基Say, 我们若已接受最坏的，就再没有什么损失。Think",
//     "德国Say, 只有在人群中间，才能认识自己。Think",
//     "史美尔斯Say, 书籍把我们引入最美好的社会，使我们认识各个时代的伟大智者。Think",
//     "冯学峰Say, 当一个人用工作去迎接光明，光明很快就会来照耀着他。Think",
//     "吉格·金克拉Say, 如果你能做梦，你就能实现它。Think"
// ];
// const bosh = [
//     "现在, 解决Event的问题, 是非常非常重要的. 所以, ",
//     "我们不得不面对一个非常尴尬的事实, 那就是, ",
//     "Event的发生, 到底需要如何做到, 不Event的发生, 又会如何产生. ",
//     "而这些并不是完全重要, 更加重要的问题是, ",
//     "Event, 到底应该如何实现. ",
//     "带着这些问题, 我们来审视一下Event. ",
//     "所谓Event, 关键是Event需要如何写. ",
//     "我们一般认为, 抓住了问题的关键, 其他一切则会迎刃而解.",
//     "问题的关键究竟为何? ",
//     "Event因何而发生?",
//     "每个人都不得不面对这些问题.  在面对这种问题时, ",
//     "一般来讲, 我们都必须务必慎重的考虑考虑. ",
//     "要想清楚, Event, 到底是一种怎么样的存在. ",
//     "了解清楚Event到底是一种怎么样的存在, 是解决一切问题的关键.",
//     "就小编来说, Event对小编的意义, 不能不说非常重大. ",
//     "小编也是经过了深思熟虑,在每个日日夜夜思考这个问题. ",
//     "Event, 发生了会如何, 不发生又会如何. ",
//     "在这种困难的抉择下, 本人思来想去, 寝食难安.",
//     "生活中, 若Event出现了, 我们就不得不考虑它出现了的事实. ",
//     "这种事实对本人来说意义重大, 相信对这个世界也是有一定意义的.",
//     "我们都知道, 只要有意义, 那么就必须慎重考虑.",
//     "既然如此, ",
//     "那么, ",
//     "小编认为, ",
//     "一般来说, ",
//     "总结的来说, ",
//     "既然如何, ",
//     "经过上述讨论, ",
//     "这样看来, ",
//     "从这个角度来看, ",
//     "我们不妨可以这样来想: ",
//     "这是不可避免的. ",
//     "可是，即使是这样，Event的出现仍然代表了一定的意义. ",
//     "Event似乎是一种巧合，但如果我们从一个更大的角度看待问题，这似乎是一种不可避免的事实. ",
//     "在这种不可避免的冲突下，我们必须解决这个问题. ",
//     "对小编个人而言，Event不仅仅是一个重大的事件，还可能会改变小编的人生. "
// ];
// const think = [
//     "这不禁令小编深思. ",
//     "带着这句话, 我们还要更加慎重的审视这个问题: ",
//     "这启发了小编. ",
//     "小编希望诸位也能好好地体会这句话. ",
//     "这句话语虽然很短, 但令小编浮想联翩. ",
//     "这句话看似简单，但其中的阴郁不禁让人深思. ",
//     "这句话把我们带到了一个新的维度去思考这个问题: ",
//     "这似乎解答了小编的疑惑. "
// ];
// const say = [
//     "曾经说过",
//     "在不经意间这样说过",
//     "说过一句著名的话",
//     "曾经提到过",
//     "说过一句富有哲理的话"
// ];

// const title = [
//     "SubjectEvent有些不对劲，当场冒了一身冷汗",
//     "最新SubjectEvent的消息，不敢相信这是真的",
//     "SubjectEvent到底是怎么回事？得知真相后大家都蒙圈了",
//     "原来SubjectEvent背后还有这种秘密，看完简直拉仇恨",
//     "震惊！SubjectEvent了，原因竟然是...",
//     "三分钟带你了解SubjectEvent，看完跪了",
//     "最新消息！SubjectEvent后竟然这样了..."
// ];