import { TruckIcon, PhotoIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import aboutApi from '../../../api/aboutApi';

export default function FeaturesServices() {
      const [about, setAbout] = useState([]);
      const [isLoading, setIsLoading] = useState(false);
    
      useEffect(() => {
        const fetchInitial = async () => {
          setIsLoading(true);
          await aboutApi.getAll()
            .then(result => {
              setAbout(result[0]);
              setIsLoading(false);
            }).catch(err => {
              setIsLoading(false);
              console.error(err.message);
            });
          return;
        };
        fetchInitial();
      }, []);

    return (
        <div className="py-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    <div className="flex space-x-4" data-aos="fade-up">
                        <div className="text-3xl text-primary">
                            <TruckIcon className="w-15 h-15 text-indigo-700" />
                        </div>
                        <div>
                            <h2 className="uppercase text-lg font-semibold text-indigo-700">Доставка</h2>
                            <p className="text-gray-600">
                                Поръчайте, а ние ще се погрижим да стигне бързо и безопасно до вашия дом безплатно!
                            </p>
                        </div>
                    </div>

                    <div className="flex space-x-4" data-aos="fade-up" data-aos-delay={100}>
                        <div className="text-3xl text-primary">
                            <PhotoIcon className="w-15 h-15 text-indigo-700" />
                        </div>
                        <div>
                            <h2 className="uppercase text-lg font-semibold text-indigo-700">По поръчка</h2>
                            <p className="text-gray-600">
                                Хареса ли ви картина? Свържете се с мен чрез формата или се обадете!
                            </p>
                        </div>
                    </div>

                    <div className="flex space-x-4" data-aos="fade-up" data-aos-delay={200}>
                        <div className="text-3xl text-primary">
                            <PhoneIcon className="w-15 h-15 text-indigo-700" />
                        </div>
                        <div>
                            <h2 className="uppercase text-lg font-semibold text-indigo-700">Контакти</h2>
                            <ul className="text-gray-600">
                                {about.showAddress === 'true' && (
                                    <li className="text-gray-600">{about?.address}</li>
                                )}
                                
                                <li><a href={`tel:${about?.telephone}`} className="text-indigo-600 hover:underline">{about?.telephone}</a></li>
                                <li className="text-gray-600">
                                    <a href={`mailto:${about?.email}`} className="text-indigo-600 hover:underline">
                                        {about?.email}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}