import './form.css'
import SelectedMinistry from '../SelectedMinistry/SelectedMinistry'

export default function Form() {
    return (
        <section
            style={{ backgroundColor: '#f5f5f8', padding: "0 35px" }}
            className="flex flex-col justify-between">
            <div>
                <div id="submission-container" className='flex' style={{ paddingTop: "25px" }}>
                    <img src="../src/icons/left.svg" alt="Back Icon" />
                    <h3 style={{
                        color: "#21416d", fontSize: "1.125rem", fontFamily: "SF Pro Display",
                        fontWeight: "600", marginLeft: "90px"
                    }}>
                        Submission
                    </h3>
                </div>
                <form action="#" id="submission-form" className="flex flex-col" style={{ marginTop: "10px" }}>
                    <label htmlFor="name" className="input-text">Name</label>
                    <input type="text" name="name" id="name" />

                    <label htmlFor="phone" className="input-text">Phone</label>
                    <input type="text" name="phone" id="phone" />

                    <label htmlFor="email" className="input-text">Email</label>
                    <input type="text" name="email" id="email" />

                    <label htmlFor="pastoral_team" className="input-text">Pastoral Team</label>
                    <select name="pastoral_team" id="pastoral_team">
                        <optgroup label="Wonderkids">
                            <option value="wonderkids">Wonderkids</option>
                        </optgroup>
                        <optgroup label="Young Warrior">
                            <option value="heart">Heart</option>
                            <option value="move">Move</option>
                            <option value="force">Force</option>
                            <option value="voice">Voice</option>
                            <option value="mind">Mind</option>
                        </optgroup>
                        <optgroup label="General">
                            <option value="yp_zone">YP Zone</option>
                            <option value="pro_family">Pro Family</option>
                            <option value="young_dreamer">Young Dreamer</option>
                            <option value="joshua_zone">Joshua Zone</option>
                        </optgroup>
                    </select>
                </form>
                <div className='flex flex-col align-center'>
                    <h4 className="input-text" style={{ marginBottom: "15px 0px" }}>Your Ministry Selection</h4>
                    <SelectedMinistry />
                </div>
            </div>
            <button style={{ backgroundColor: "#173965", color: "white", marginBottom: "35px" }}>Submit</button>
        </section>
    )
}