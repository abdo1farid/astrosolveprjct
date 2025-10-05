import ProfileCard from "./ProfileCard/ProfileCard"

const Teams = () => {
    return (
    <section id="team" className="mx-auto lg:px-7 xl:max-w-8xl flex flex-col items-center w-full p-7 mt-20 bg-slate-700/20 rounded-2xl">
            <h1 className="text-center text-4xl font-bold m-10">Our Teams</h1>
            <div className="grid grid-cols-1 gap-32 scale-75 place-items-center sm:grid-cols-2 mx-auto min-[1287px]:grid-cols-4 min-[1287px]:gap-96  ">
                <ProfileCard name="Abderrahmane Farid" title="Software & Hardware" />
                <ProfileCard name="Yassine BEEN ELAHJRA" title="Software" />
                <ProfileCard name="Mohammed Fadel ABAHAZEM" title="Software" />
                <ProfileCard name="Chadane ELMOUTAOUAKIL" title="3D/Architecture" />
                <ProfileCard name="Said TALHAMRIT" title="Hardware" />
                <ProfileCard name="Yassmine ElMASSAOUDI" title="Hardware" />
                <ProfileCard name="Rim ZAOUI" title="3D/Architecture" />
                <ProfileCard name="Andréa Juliette BELINGA MANDENG" title="3D/Architecture" />
                <ProfileCard name="Tracy Michelle CHAKOUA TCHOUAFFI" title="Software" />
                <ProfileCard name="Andréana Bryana KAPTUE MOGOUNG" title="Hardware" /></div>

        </section>
    )
}

export default Teams
