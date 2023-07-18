import LoadingBar from "./LoadingBar";

export default function GameRating(props) {
  return (
    <div className="w-4/5 flex flex-col gap-4">
      <div className="flex flex-row-reverse gap-3 w-full justify-between text-white">
        <div className="p-2 px-8 bg-[#CEEDEB] rounded-2xl shadow-xl text-gray-400">تقييم اللعبة</div>
        <div className="p-2 px-8 bg-primary-color rounded-2xl shadow-xl">تفاصيل اللعبة</div>
        <div className="p-2 px-8 bg-primary-color rounded-2xl shadow-xl">محتوى اللعبة</div>
        <div className="p-2 px-8 bg-primary-color rounded-2xl shadow-xl">مشاهد من اللعبة</div>
      </div>
      <div className="bg-[#CEEDEB] border border-[#BFE8E5] p-8 rounded-lg text-[#9C9C9C] flex
      flex-col gap-2">
        <LoadingBar title="ديني" progress={parseInt(props.gameRating.religious * 20)} color="#EA661B" />
        <LoadingBar title="أخلاقي" progress={parseInt(props.gameRating.moral * 20)} color="#BD2929" />
        <LoadingBar title="نفسي" progress={parseInt(props.gameRating.psychological * 20.0)} color="#E44C82" />
        <LoadingBar title="مالي" progress={parseInt(props.gameRating.financial*20)} color="#76D79D" />
        <LoadingBar title="اجتماعي" progress={parseInt(props.gameRating.social*20)} color="#FEA36F" />
      </div>
    </div>
  );
}
