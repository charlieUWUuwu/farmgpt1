import {
  BeakerIcon,
  LightBulbIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen px-2 ">
      <h1 className="text-3xl font-bold mb-10 ">FarmGPT</h1>

      <div className="flex space-x-2 text-center">
        <div>
          <div className="flex flex-col items-center justify-center mb-5 space-y-2">
            <LightBulbIcon className="h-6 w-6 white" />
            <h2>範例問題</h2>
          </div>

          <div className="space-y-2">
            <p className="infoText">"甚麼是土壤碳匯?"</p>
            <p className="infoText">"土壤有機碳是什麼?"</p>
            <p className="infoText">"什麼種植方法可以讓我的土地碳含量增加?"</p>
          </div>
        </div>

        <div>
          <div className="flex flex-col items-center justify-center mb-5 space-y-2">
            <BeakerIcon className="h-6 w-6 white" />
            <h2>特色</h2>
          </div>

          <div className="space-y-2">
            <p className="infoText">提供多個模型供您詢問</p>
            <p className="infoText">以多篇學術期刊為智庫</p>
            <p className="infoText">含國際法規資料庫供您了解市場需求</p>
          </div>
        </div>

        <div>
          <div className="flex flex-col items-center justify-center mb-5 space-y-2">
            <ExclamationCircleIcon className="h-6 w-6 white" />
            <h2>注意事項</h2>
          </div>

          <div className="space-y-2">
            <p className="infoText">對於農業以外的問題我無法了解</p>
            <p className="infoText">我無法回應與農業、碳市場無關的問題</p>
            <p className="infoText">若要更清楚的資訊，請更詳細描述問題</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 mb-4 w-1/2"></div>
    </div>
  );
}

export default HomePage;
