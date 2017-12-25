const cli = require('cli-interact');

module.exports = () =>{
    var stuINfo = [];
    let input =cli.question("1. 添加学生\n"+
                                "2. 生成成绩单\n"+
                                "3. 退出\n"+
                                "请输入你的选择（1～3）：")
    switch(input.strim()) {
        case '1':
            let input1 = cli.question("请输入学生信息（格式：姓名, 学号, 民族, 班级, 学科: 成绩, ...），按回车提交：");
            student1(input1);
            break;
        case '2':
            let input2 = cli.question("请输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：");
            student2(input2);
            break;
        case '3':
            console.log("退出!");
            process.exit(1);
            break;
        default:
            main();
    }
}


exports.student1 = function student1(input){
    try{
        let inputArr = input.split(",");
        if( !(inputArr.length === 8)){
            throw "请按正确的格式输入（格式：姓名, 学号, 学科: 成绩, ...）";
        }
        var stu=  {};
        stu.name = inputArr[0];
        stu.code = inputArr[1];
        stu.nation = inputArr[2];
        stu.klass = inputArr[3];
        var scores = [];
        var sumScore = 0;
        for(var i =4 ; i<inputArr.length ; i++){
            var courses ={};
            var temp = inputArr[i].split(":");
            courses.course = temp[0];
            courses.score = parseInt(temp[1]);
            scores.push(courses);
            sumScore+=parseInt(temp[1]);
        }
        stu.scores = scores;
        stu.sumScore = sumScore;
        stuInfo.push(stu);
        console.log("学生"+inputArr[0]+"的成绩被添加");
        console.log(stu);
        //main();
    }catch(err){
        console.log(err);
        main();
    }
}
exports.student2 = function student2(input){
    var scoreArr = [];
    try{
        let inputArr = input.split(",");
        if(inputArr.length === 1 && isNaN(inputArr)){
            throw "请按正确的格式输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：";
        }
        var sumscore =0;
        console.log("成绩单");
        console.log("姓名|数学|语文|英语|编程|平均分|总分 ");
        console.log("=====================================");
        for(var j = 0 ; j< stuInfo.length ; j++){
            var stu = stuInfo[j];
            var sum = parseInt(stu.scores[0].score)+parseInt(stu.scores[1].score)+parseInt(stu.scores[2].score)+parseInt(stu.scores[3].score);
            sumscore+=sum;
            if(inputArr.indexOf(stu.code) !== -1){
                console.log(stu.name+"|"+stu.scores[0].score+"|"+stu.scores[1].score+"|"+stu.scores[2].score+"|"+stu.scores[3].score+"|"+sum);
                scoreArr.push(stu.sumScore);
            }
        }
        console.log("全班总分平均数："+parseInt(sumscore/inputArr.length));
        console.log("全班总分中位数："+median(scoreArr));
        main()
    }catch(err){
        console.log(err);
        main();
    }
}

function median(scoreArr){
    for(var i=0;i< scoreArr.length ;i++){
        for(var j =i; j< scoreArr.length ; j++){
            if(scoreArr[i]< scoreArr[j]){
                var temp = scoreArr[i];
                scoreArr[i] = scoreArr[j];
                scoreArr[j] = temp;
            }
        }
    }
    return scoreArr[parseInt(scoreArr.length/2)]
    
}
