/**
 * Copyright 2025 BioTechPark
 * License Apache-2.0
 */

import ObjectivesCard from "./ObjectivesCard";

const objectivesItem = [
  {
    icon: 'looks_one',
    label: 'Improve urban quality of life',
    desc: 'Enhance city living standards'
  },
  {
    icon: 'looks_two',
    label: 'Offer a smart relaxation space',
    desc: 'Provide intelligent leisure area'
  },
  {
    icon: 'looks_3',
    label: 'Connection, rest, technology',
    desc: 'Offer users a public space for meetings, relaxation, and access to technology'
  },
  {
    icon: 'looks_4',
    label: 'Enhance visitor comfort and experience',
    desc: "Improve guests' comfort and satisfaction"
  },
  {
    icon: 'looks_5',
    label: 'Foster social connections',
    desc: 'Encourage building meaningful relationships'
  },
  {
    icon: 'looks_6',
    label: 'Integration of green technologies',
    desc: 'Eco-friendly tech for sustainability'
  },
];

const Objectives = () => {
  return (
  <section className="section" id="objectives">
    <div className="container bg-slate-700/20 p-10 rounded-3xl">
            <h2 className="headline-2">
                Our Objectives
            </h2>

            <p className="text-slate-300 m-3 max-w-[110ch]">
                Our goal is to improve urban quality of life by offering a smart relaxation space that reduces maintenance costs while enhancing visitor comfort and experience. It provides users with a public area for meetings, rest, and access to technology. The space also encourages education and awareness through digital tools, making the garden a pedagogical place. Designed as a green lung for the region, it focuses on intelligent water management and biodiversity improvement, reducing urban pollution. Maintenance of green spaces is digitized, and green technologies are integrated to promote sustainability. Overall, the project aims to foster social connections within the community.
            </p>

            <div className="grid gap-3 grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))]">

                {
                    objectivesItem.map(({icon,label,desc}, key) => (
                        <ObjectivesCard
                        key={key}
                        icon={icon}
                        label={label}
                        desc={desc}
                        />
                    ))
                }

            </div>
        </div>
    </section>
  )
}

export default Objectives
