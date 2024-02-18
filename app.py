from flask import Flask, render_template, redirect, flash, url_for, request, session
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import Email, DataRequired, Length, EqualTo
from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SECRET_KEY'] = 'kunwariSecretLang'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///maps_user.db'
db = SQLAlchemy(app)


class StudentInfo(db.Model):
    __tablename__ = 'User_Table'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(200), nullable=False)
    username = db.Column(db.String(200), nullable=False, unique=True)
    password = db.Column(db.String(200), nullable=False)


class RegistrationForm(FlaskForm):
    email = StringField('Email', validators=[
                        DataRequired(), Length(min=3, max=100)])
    username = StringField('Username', validators=[
                           DataRequired(), Length(min=3, max=100)])
    password = StringField('Password', validators=[
                           DataRequired(), Length(min=3, max=100)])
    signup = SubmitField('Sign Up')


class LoginForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    submit = SubmitField('Log In')

@app.route('/', methods=['GET', 'POST'])
def home():
    loginForm = LoginForm()

    if loginForm.validate_on_submit():
        username = loginForm.username.data
        password = loginForm.password.data

        student = StudentInfo.query.filter_by(username=username).first()
        if student and check_password_hash(student.password, password):
            session['username'] = username
            return redirect(url_for('landing'))

    return render_template('login.html', loginForm=loginForm)


@app.route('/register', methods=['POST', 'GET'])
def register():
    registrationForm = RegistrationForm()

    if registrationForm.validate_on_submit():
        email = registrationForm.email.data
        username = registrationForm.username.data
        password = registrationForm.password.data
        registerInfo = StudentInfo(
            email=email, username=username, password=generate_password_hash(password))
        db.session.add(registerInfo)
        db.session.commit()

        return redirect(url_for('home'))

    return render_template('register.html', registrationForm=registrationForm)


@app.route('/home', methods=['POST', 'GET'])
def landing():
    if 'username' in session:
        return render_template('main.html')
    return redirect(url_for('home'))

@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('home'))


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
